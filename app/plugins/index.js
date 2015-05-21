import {plugins} from 'config/plugins';
import immutable from 'seamless-immutable';
import fluxApp from 'fluxapp';

import {filter, isArrayLike, forEach, 
  intersection, keys, mapObj, toPairs, reduce} from 'ramda';


class PluginManager {
  constructor() {
    this.PLUGIN_PREFIX = 'manifold-plugin-';

    // Interceptors for stores and actions
    this._stores = immutable({});
    this._actions = immutable({});
  }

  discover() {
    return filter(pluginName => {
      try {
        require(this.PLUGIN_PREFIX + pluginName);
        return true;
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          return false;
        } else {
          throw e;
        }
      }
    }, plugins);
  }

  joinInterceptors(local, newInterceptors) {
    let workingLocal = local.asMutable();
    forEach(params => {
      const [ storeName, interceptor ] = params;

      if (!workingLocal[ storeName ]) {
        workingLocal[ storeName ] = [];
      }
      workingLocal[ storeName ].push(interceptor);
    }, toPairs(newInterceptors));

    return immutable(workingLocal);
  }

  register(pluginNames) {
    if (!isArrayLike(pluginNames)) {
      pluginNames = [ pluginNames ];
    }

    forEach(pluginName => {
      const plugin = require(this.PLUGIN_PREFIX + pluginName);
      this._stores = this.joinInterceptors(this._stores, plugin.stores);
    }, pluginNames);
  }

  autoRegister() {
    this.register(this.discover());
  }

  registerStore(name, spec={}) {
    const self = this;

    spec.emitChange = function interceptedEmitChange() {
      const newState = reduce((state, interceptor) => interceptor(state),
        this.getState(), self._stores[ name ]);

      this.state = immutable(newState);
      this.emit('changed', this.state, this.id);
    };

    return fluxApp.registerStore(name, spec);
  }
}

export default new PluginManager;
