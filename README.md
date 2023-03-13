# Transaction-watch-dog

## Prerequisites

* `PostgreSQL` Server
    * an account w/ permission to create new Databases
* `NodeJS` >= `v18.13.0`

## Preferably

* `pgAdmin` v5 PostgreSQL GUI

## Start the project

* clone the project
    * `git clone https://github.com/vikrusev/transaction-watch-dog.git`
* go to the `app` directory of the project
    * `cd ./transaction-watch-dog/app`
* install required `npm` packages
    * `npm ci`
* create `.env` file
    * should be in `./app/.env`
    * required environment variables
        * `APP_PORT`
            * number
            * port on which the REST API server will listen
            * defaults to `3000`
        * `NODE_ENV`
            * specify the work environment
            * defaults to `development`
        * `PROVIDER_WEBSOCKET`=wss://mainnet.infura.io/ws/v3/<INFURA_API_KEY>
            * websocket of the provider, used for connecting to a node
        * `MAX_TRANSACTION_COUNT`
            * number
            * intentionally limit the requests made to the `PROVIDER_WEBSOCKET`
                * this is done because of daily limitations which can be surpassed
        * `MONITOR_ETHEREUM_MAINNET`
            * either to start submitting events and process new pending Ethereum transactions or not
                * defaults to `0` - do not monitor
                * can be `1` - do monitor
        * `WORKER_POOL_ENABLED`
            * whether to use workerpool `worker_threads` or not
            * app is tested when it is set to `1`
* initialise the DB
    * edit the environment you will be using in `./app/config/config.js`
    * you need an existing user in PostgreSQL
        * `username`
        * `password`
        * `database`
        * `host`
        * `dialect`
    * run `npm run db:init`
        * this will run `npm run dn:migrate && npm run db:seed`
        * in case of the need to rollback
            * run `npm run db:rollback`
        * seperate operations are also supported
* run the application
    * `cd ./app && node index.js`

## TODO

* better loggin system
* include ESLint
* implement `DI Awilix`
* better README documentation
* query optimization
* etc