# Rewind - A personal timeline and distributed social network engine

## About

We use many different services on a day-to-day basis. Foursquare for check-ins, Twitter for small updates, Tumblr for larger blogposts - the list is endless, and they're all designed around sharing as much as possible. Sometimes you don't want to share your thoughts and feelings, you just want to record them.
  
Rewind is based around the concept of owning your own data. It's self hosted, so your data isn't shared with companies unless you explicitly share your posts with other services. It has an open protocol, so if you don't want to use the standard Rewind client, choose another one. It also supports a range of update types, from location check-ins to full Markdown powered blog posts - keep everything in one place and in context with each other.

To see what Rewind looks like in it's current state, visit [Nathan Kunicki's Rewind blog](http://rewind.nathankunicki.com).

## Installation

Install Node.js v4.2.4 or above (Take a look at [nvm](https://github.com/creationix/nvm) for easy management of multiple versions of Node.js).

### With Postgres as a datastore (For running in production)

1. Clone the repository
2. npm install --production
2. Add your database connection information into config.dev.json (See example).
3. npm start

### With SQLite as a datastore (For development purposes)

1. Clone the repository
2. npm install
4. (Optional) npm install gulp -g (For compiling the client-side Javascript)
5. npm start

## Roadmap

Rewind is a living project. It's in early stages right now, but is being developed publicly and is open to contributions. This is the feature roadmap for the foreseeable future:

### Phase 1 - A personal timeline

* Add authentication support (Multi-user support with JWT)
* Flick between visitor and admin states depending on whether a user is logged in or not (Once this is implemented, Rewind is considered "useable")
* Public and private updates
* Fully working location check-ins
* Image upload and attachment
* Markdown powered posts

### Phase 2 - A distributed social network

* Enable people to follow each other by URL and periodic fetching
* Pub-sub mechanism for pushing new posts to your followers
* "Friending" - Allow a follower to see posts marked as friends only
* Mentions
* "Retweeting"

### Phase 3 - An open protocol

* Fully document the API and protocol
* Add OAuth authentication to allow creation of third-party cilents (Mobile and otherwise)
