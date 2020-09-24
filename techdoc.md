# Welcome to DMC-FRONT!

Hi! This is the documentation to help you in updating, configuration, and maintaining the CRM system.


# Ecosystem

This project was generated with  [Angular CLI](https://github.com/angular/angular-cli)  version 7.3.8 and updated to 10.1.1.

The project was created by [Themeforest](https://themeforest.net/item/ubold-responsive-web-app-kit/13489470) and included only angular full version. The current Ubold version is 4.1.0 which implements Vue.js, React.js, and Angular as well.

## Dependencies

Let's talk about every dependency in the project. So open `package.json` and take a look at **dependencies** section. Here we see a lot of angular/* and fullcalendar/* dependecies they are very important but not interesting. Interesting dependencies look like that:


- ng-bootstrap/ng-bootstrap
	> We love bootstrap, its easy to implement and use, so it's our way.
- ng-select
	> Prety good select input, well understandable
- ngrx/core
	> Redux-like-angular-alternative. If you have used redux in React.js projects you know what it means, but if you have not read [this](https://redux.js.org/introduction/getting-started)
- alife-file-to-base64
	> Upload and convert file to base64, as usual, its image. We used this to upload the avatar on the profile page and show user results.
- angular-archwizard
	> It's like you used to install games in 2009, step by step selecting a folder for a game and installing DirectX and launching.
- angularx-social-login
	> Awesome package for the integration with Google and Facebook OAuth2, ease to set and use.
- ngx-quill
	> Beauty word-like editor, well designed and easy to implement

This a list of interesting and 'need to explain' dependencies. Its how 'it is', battle-tested tools.

We will not talk about **devDependencies** because they include developing packages for testing, linting, prettify, and other good things for better development, you should use them but you don't have to understand them.


## Dockerfile

We use docker, we love docker, docker is cool but we don't need docker. So think twice before including docker to your project and buying private repos for 7$ each.
So what we see in our Dockerfile:
```
# base image  
FROM node:12.2.0  
  
# install chrome for protractor tests  
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -  
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'  
RUN apt-get update && apt-get install -yq google-chrome-stable  
  
# set the working directory  
WORKDIR /app  
  
# add `/app/node_modules/.bin` to $PATH  
ENV PATH /app/node_modules/.bin:$PATH  
  
# install and cache app dependencies  
COPY package.json /app/package.json  
RUN npm install  
RUN npm install -g @angular/cli@~8.0.2  
  
# add app  
COPY . /app  
  
# start app  
CMD ng serve --host 0.0.0.0
```
We see **FROM** command that says download and install node 12.2.0v.
**RUN** says to OS to get something from url and start some shell scripts and do an update and install chrome or whatever you want. So this command does whatever you want to do with OS.
**WORKDIR** defines the current working directory.
**ENV** add or edit the environment variable.
**COPY** you can use ```RUN cp smth smth``` instead-but better to write like the documentation says. And it's more readable to use Docker commands instead plenty **RUN**.
**CMD** it should be your last command in Dockerfile, that command says what this container does and for what all this stuff.

## Server

Open ```server.js``` file in your editor. Also, you can test this by ```node server.js``` command.
Here we see a simple express configuration. That's it. Nothing interesting, just hosting ```index.html```. 
But this file is needed for **Heroku** which does not implement hosting single ```index.html``` files. So we need to wrap our application in express server.

## Other

- .browserslistrc
	> You can read comments to know what he does, but you dont need.
- .dockerignore
	> .gitignore-like-file
- .gitignore 
	> Was generated automaticly by https://www.gitignore.io
- .prettierrc
	> Pretify your code by shortcut CTRL + ALT + L in ubuntu, Webstorm.
- angular.json
	> Was generated automaticly by angular-cli (maybe)
- ngsw-config.json
	> Realy dont know what is this, something valuable maybe
- package-lock.json
	> Was generated automaticly by npm
- README.md
	> simple how to use
- tsconfig.json
	> This file provides ```paths``` for ease import like that ```import smth from '@pages/...'``` 
- tslint.json
	> linter for better coding, rules and other rules

## Resume

My dear friend its not over, its only the start of a very wonderful adventure in angular world. If you're tired or don't want to spend your time reading how it works you can skip the next section. It's not a problem if you don't read an explanation, explanation for scared boys and I hope you are not scared, boy. So don't read how to code, close this doc and just go to coding. "Luck loves the brave"


# Source code

Welcome back, in this section you will understand how this project works with: components, constants, guards, helpers, interceptors, mocks, models, providers, services, store, layouts, pages, shared.


## Before app folder
**src** folder contain **app**, **environments**, **assets** directories and some additional configuration files like:

- index.html
	> Here you can some links, metas and ```<app-ubold></app-ubold>``` tag which contain our application
- karma.conf.js
	> config for testing via karma
- main.ts
	> providing env and bootstrap
- manifest.webmanifest
	> file for caching icons, created for **PWA**
- polyfills.ts
	> just use it 'as it is'
- styles.css
	> global styles
- test.ts
	> test configuration
- tsconfig.app.json
	> another file just for something i really don't care
- tsconfig.spec.json
	> read above
- tslint.json
	> lint code for better code

**environments** folder contains two files, one for develop other for production, either contain the same structure but with different values.
**assets** folder contains fonts, icons, images, sccs files.

## Inside the application
Here we go to the magic. Before we start I want to say that this code was written with love, its no joke, it's really true. You can find the author by these nicknames (tomiho19, Kronus, sa1exx, pussyDestoyer, @sycablyad).

### Components
It's a reuseable piece of combined ts, html, css etc. 
- charts
	> Contain models for charts, in our example for multiple radial chart and revenue radial chart.
- editable
	> This component for editing fields in table, in our project it was implemented at contractor page for cost, arrangement, amount columns.
- errors
	> Components for 404 and 500 errors
- notification
	> This component for notifying a user about errors, warnings, info, success. In the right top corner, containing title and message and timeout about 1.5s. Injects notification service for handling notifications.

### Constants
Export something constant values such as numbers, strings, and other primitive types. 

colors.ts

 ```export const red = '#B80F0A';```

endpoints.ts
```
export const endpoints = {  
  LOGIN: 'login',  
  TOKEN_REFRESH: 'token-refresh',  
  CONTRACTOR: 'contractors',  
  MANAGE_NEWS_PROJECTS: 'manage-news-projects',  
  BURST_NEWS: 'burst-news',  
  NEWS_PROJECTS: 'news-projects',  
  HASHTAGS: 'hashtags',  
  POST_FORMAT: 'post-format',  
  USERS: 'users',  
  CONFIRM_USER: 'confirm-user',  
  INVITE_NEW_USER: 'invite-new-user',  
  CHANGE_GROUP: 'change-group',  
  CHANGE_PASSWORD_CONFIRM: 'change-password-confirm',  
  CHANGE_PASS: 'change-pass',  
  PROFILE: 'profile',  
  POST_FORMATS: 'postformats',  
  PROJECTS: 'projects',  
  EMAILS: 'news-emails',  
  NEWSPROJECTS: 'newsprojects',  
  NEWS_WAVES: 'news-waves',  
  NEWS_FILE_UPLOAD: 'news-fileupload',  
  FORMATION_FILE_UPLOAD: 'wave-formation-fileupload',  
  CLIENT: 'clients',  
  PUBLICATIONS: 'publications',  
  PUBLICATIONS_BLACKLIST: 'publications-blacklist',  
  COMMENTS: 'comments'  
};
```

### Guards
Auth guards provide security for routes, redirect to the login page. It's like a guard you know, you cannot go inside the application if you have not logged in.
canActivate method checks the user and returns boolean, if not logged in so redirect to the login page with the return URL.

### Helpers
Some helper classes for some needs.

- convert-case
	> Convert snake case to camel case. In our project we use python and js, so python uses snake_case and js uses camelCase.
- error-handler
	> notify user about error, calls notification service and says what to do
- request-handler
	> convert camelCase to snake_case before sending to API, and process callback
- response-handler
	> notify a user about success, clear any errors that happened before
- router-stub
	> returns string url, was created for testing services
- utility
	> some additional functions to do something additional things...

### Interceptors
Interceptor its a middleware class, processing some logic between requests and requests-handlers.

- error-interceptor
	> catch error from server and handle it
- jwt-interceptor
	> inject token, update token via refresh token, resend requests
- loading-interceptor
	> start and stop loading, notify loading service
- request-interceptor
	> do prevent waiting for closed requests

### Mocks
Mock data for testing services, components. Export mock data generated by the backend server. Mock files contain exactly a copy of returned data from API.

### Models
Contain **instances**, **payloads**, **responses** folders. This folders include interfaces. For example instances can be like that:
```
export interface Contractor {  
  id: number;  
  editorName: string;  
  contactPerson: string;  
  phoneNumber: string;  
  email: string;  
  postformatlistSet: Array<PostFormatListSet>;  
  contractorcommentlistSet: Array<Comment>;  
  contractorpublicationsblacklistSet: Array<PublicationBlackList>;  
  contractorpublicationslistSet: Array<Publication>;  
  dateCreated: Date;  
  dateUpdated: Date;  
}
```
Its a copy of Contractor model from server.
**payloads** can be like that:
```
export interface LoginPayload {  
  data: {  
    email: string;  
  password: string;  
  };  
}
```
**responses** structure can be like that:
```
export interface LoginResponse {  
  success: boolean;  
  token?: Token;  
  user?: User;  
  errors?: object;  
}
```
So this is what we know about api.

### Providers
Provide connection between the application and Web API

- cookie.service
	> set, get values to cookies + expires
- storage.service
	> set, get value to local storage

### Services
Controllers for application, react to components changing, sending api calls.

- auth.service
	> service for authentication users. Getting, setting, removing user, token, instance. Request access token by refresh token, handle unauthorized.
- client.service
	> initialize forms for create and update client, client CRUD,
	select client for updating.
- contractor.service
	> initialize forms for create, update contractor, format. Contractor CRUD, check contractor methods (checkbox), collect and process data for requests
- error.service
	> set and clear error.  Nothing interesting.
- loading.service
	> start and stop loading for spinners
- news.service
	> Big, huge service CRUD for a project, news, formats, hashtag. Initializing forms for this all stuff. Handling and processing data and payload for requests. This is a big service.
- notification.service
	> notify methods, store notifications and notification history, tracking time for notification
- pagination.service
	> paginate data, universal class, provide pageSize, currentPage etc
- project.service
	> News project CRUD, with initialize forms for project and email
- publication.service
	> provides CRUDs for publication, publicationBlackList, comments.
	Initilization for forms.
- security.service
	> sanitize html, for security reasons
- ticket.service
	> pagination, filtering, highliting searching items
- user.service
	> CRUD for users, signup, confirm reset password, update profile etc

So that's it, services do a lot of work in an app based on Angular methodology.

### Store

"Store is RxJS powered global state management for Angular applications, inspired by Redux. The store is a controlled state container designed to help write performant, consistent applications on top of Angular."

Let's see what is this and what it contains

- actions
	> actions its classes for determine which exactly thing you want to call
	for example if you want to get all clients you could use GetClients class ```dispatch(new GetClients());```
- effects
	> effect its a method you want to call after dispatch GetClients ```@Effect()  
getClients$ = this.actions$.pipe(  
  ofType<GetClients>(EClientActions.GetClients),  
  switchMap(() => this.clientService.getAll()),  
  switchMap((proxies: Client[]) => of(new GetClientsSuccess(proxies)))  
);```
- reducers
	> its like you want to process something, for exaple if you want to save data you can do next ```... case EClientActions.GetClientsSuccess: {  
  return {  
    ...state,  
  clients: action.payload,  
  };  
}```
- selectors
	> its how you want to get access to your data ```export const selectClientList = createSelector(selectClients, (state: IClientState) => state ? state.clients : []);```
- state 
	> says what structure you want ```export const initialClientState: IClientState = {  
  clients: [],  
  selectedClient: null,  
};```

	
### Layouts
In the out project we have four layouts:

- footer
	> contain footer info something like that ```2015 - 2020 © UBold theme by Coderthemes```
- rightsidebar
	> we did not use this component at all, but there are some configurations for theme, styles etc
- sidebar
	> menu, links for navigating to pages
- topbar
	> notification menu, create new email tools etc

```layout.component``` is a container for pages, skeleton

### Pages
Pages contain some modules, its modular architecture.
Structure:
	
- account
- crm
- email
- extras
- form

#### Account
This module contains confirm, login, password reset, signup pages:

- confirm
	> Informs a user that his password was changed
- login
	> This component for login user in crm
- reset-password
	> This component for change user password
- signup
	> This component for sign up new user

#### CRM
This module contains burst-news, clients, contractors, projects, publications, reports, users pages

- burst-news
	> This component does a lot of work. Here we can create a news wave that includes news. News contains title, contractors, and content, see **news.wave.model** . We can create one or many news waves for **news project**. 
- clients
	> This component for comfortable working with clients. Simple CRUD.
- contractors
	> This component does crud for a contractor and many other actions such as partial update contractor for cost, amount, arrangement fields, multiple edits and delete.
- projects
	> Here we create a news project for burst news. So we have one project and can create news waves for this project.
- publications
	> This component informs us about contractor preferences such as what the contractor can publish or what contractor cannot publish or another special information
- reports
	> Here we see data of project and we can download, upload or remove report.xls file
- users
	> This component for watching the full list of users in the system, downgrade or upgrade user privileges

#### Email

This module has three pages such as **composeemail**, **inbox**, **reademail**:

- composeemail
	> Here we can create our message to send it to the api
- inbox
	> This component contain logic for list all messages
- reademail
	> This component represent email details

#### Extras
Extras module has only one profile page:

- profile
	> User profile page, editing avatar, first name, last name

#### Form
Contain validation reusable components

- validation
	> regex, patterns, error-highlight

 
### Shared

This folder for sharing some common **directives**, **pipes** and **ui**

#### Directives
Contains reusable directives for html tags with additional logic

- edit-mode
	> returns edit mode template
- editable-on-enter
	> set host listener and switch mode on event
- tickets-sortable
	> provide sort by column asc dsc
- view-mode
	> returns view mode template

#### Pipes
Contains reusable pipes for processing complex logic in html

- contractors-arrangment
	> returns arrangment of all contractors by format
- contractors-cost
	> returns cost of all contractors by format
- contractors-format
	> returns formats with label
- contractors-names
	> returns names of all contractors
- contractors-news-amount
	> returns news amount of all contractors by format
- project-status
	> returns filtered by confirm

#### UI
Here we see some ui components which we use in our project.

## Conclusion
Thank you mate for reading this, have a nice day, love mom and don't worry about errors. And remember it's just a project, but how you do it will determine your future.
