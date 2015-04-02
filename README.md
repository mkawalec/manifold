## Manifold, the example fluxApp app

### How to get it working

You'll need docker, fig and Make installed. Other than that the commands
that follow should keep you covered. In one terminal run:

    fig up

In another:

    npm install -g foreman mariner
    make dev

And in a third one start the server (while having the result of `make dev`
running):

    mariner migrate up
    make server


Then head to `localhost:5000` or `localhost:5000/login` to login. The
default credentials are `admin:admin`. Be safe.
