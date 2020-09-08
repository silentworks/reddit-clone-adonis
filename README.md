# Reddit Clone using Adonis JS v5

This is a hobby project used to learn Adonis v5, it's only doing simple CRUD operations.

### How to setup

`git clone` the project to a directory on your computer, then `cd` into its directory and run

```sh
npm install
```

Once the installation has completed you will need to setup your database by copying the `env.example` and add the appropriate database connection params along with the other values in it.

Start the dev server

```sh
node ace serve --watch
```

Now you will need to run your migrations in another terminal window

```sh
node ace migrations:run
```

Visit the server url that was shown in your console when you ran the dev server command