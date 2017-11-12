## File uploader
### How to setup
##### Install dependencies
```bash
yarn install
```
##### Setup PostgreSQL
1. Install PostgreSQL 

    ```bash
    sudo apt-get install postgresql
    ```
2. Change the default user password
    ```bash
    sudo passwd postgres
    ```
3. Change the Postgres admin password
    ```bash
    # Change to the postgres user
    su - postgres
    # Log in to the postgres prompt
    psql
    # Change password
    \password postgres
    ```
4. Create database
    ```bash
    # (In postgres prompt)
    CREATE DATABASE files;
    ```
5. Run script to create table 'files'
    ```bash
    DATABASE_URL='postgres://postgres:<YOURPASSWORD>@localhost:5432/files' node models/files.js
    ```
    where <YOURPASSWORD> is a password you typed in step 3
##### Build for development
Use webpack-dev-server with hot reload, source maps and dev React version
```bash
yarn dev
```
##### Build for production
```bash
yarn build
```
##### Start server
Server serves built files from /dist, so you need to run `yarn build` first.
```bash
DATABASE_URL='postgres://postgres:password@localhost:5432/files' node index.js
```
