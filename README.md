## Manifold, the example fluxApp app

### How to get it working

You need to install some stuff globally first, and init the environment:

    sudo npm install -g foreman mariner
    make init

And then fire up the interface and the server then. In two separate
terminals do:

    make dev
    make server

Keep em both running and head to `localhost:5000` or
`localhost:5000/login` to log in. Default credentials are `admin:admin`
