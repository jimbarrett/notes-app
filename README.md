Simple note-taking app using NextJS with SQLite database.

Publicly visible [here](https://hammerhead-app-ksx6q.ondigitalocean.app/)

To run locally:

```bash
npm install 
npm run dev
```
## Decisions overview:

I approached this with the goal of keeping it portable and easy to deploy (locally or to a cloud provider). For that reason I chose to go with NextJS with SQLite for the db. SQLite gives me the option to track the db in git which is something I would never do under normal circumstances but for the sake of a simple, easy to deploy app it seemed to make sense.

I chose to use JS over TS primarily because I'm not nearly as comfortable with TS as I'd like to be. I was trying to time-box myself a little on this and I felt that using TS would result in lower quality code that would take longer to write. This is a weakness that I'm working to overcome starting immediately.

I didn't implement any authentication. In the real world I felt like this would be inheriting auth from the larger app and implementing it here didn't seem to add much value. Again, trying to time-box myself a bit.

For the ORM I chose Prisma. There's no particular reason for this aside from the fact that it's easy to set up and has good documentation.

I decided to use Context API rather than Redux, again, for the sake of simplicity. I find that for smaller applications the Context API is easier to set up and work with. Though I feel like toward the end this has started to get to a point where I would probably switch to Redux before adding many more features.

## Things I would do next:

- Sort the notes table by column.
- Search should submit when the user hits enter!
- clean up created/updated dates. change the output to 'Last updated 30 mins ago', etc.
- move the form validation to a helper function so I don't have that code duplicated.
- switch to Redux (if the functionality was going to expand much beyond where it is now)
- create the clients table and functionality to share a note with a client. this could be via join table so one note can be shared with multiple clients
- authentication with next-auth
