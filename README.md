## Manifold, the example fluxApp app

### How to get it working

You need to have docker and docker-compose installed, then:

    sudo npm install -g foreman mariner nodemon
    make init

And fire up the interface and the server. In two separate terminals
execute:

    make dev
    make server

Keep em both running and head to `localhost:5000` or
`localhost:5000/login` to log in. Default credentials are `admin:admin`
