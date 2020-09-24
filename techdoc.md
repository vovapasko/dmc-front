# Welcome to DMC-FRONT!

Hi! This is the documentation to help you in updating, configuration and maintaining the crm system.


# Ecosystem

This project was generated with  [Angular CLI](https://github.com/angular/angular-cli)  version 7.3.8 and updated to 10.1.1.

The project was created by [Themeforest](https://themeforest.net/item/ubold-responsive-web-app-kit/13489470) and included only angular full version. Current Ubold version is 4.1.0 which implement Vue.js, React.js and Angular as well.

## Dependencies

Let's talk about every dependency in the project. So open `package.json` and take a look at **dependencies** section. Here we see a lot of angular/* and fullcalendar/* dependecies they are very important but not interesting. Interesting dependencies looks like that:


- ng-bootstrap/ng-bootstrap
	> We love bootstrap, its ease to implement and use, so its our way.
- ng-select
	> Prety good select input, well understable
- ngrx/core
	> Redux-like-angular-alternative. If you have used redux in React.js projects you know what it means, but if you have not read [this](https://redux.js.org/introduction/getting-started)
- alife-file-to-base64
	> Upload and convert file to base64, as usual its image. We used this to upload avatar in the profile page and show user result.
- angular-archwizard
	> Its like you used to install games in 2009, step by step selecting folder for a game and installing DirectX and launching.
- angularx-social-login
	> Awesome package for integration with Google and Facebook OAuth2, ease to set and use.
- ngx-quill
	> Beauty word-like editor, well designed and ease to implement

This a list of interesting and 'need to explain' dependecies. Its how 'it is', battle-tested tools.

We will not talk about **devDependencies** because they include develope packages for testing, linting, pretify and other good things for better developmnet, you should use them but you dont have to understand them.


## Dockerfile

We use docker, we love docker, docker is cool but we dont need docker. So think twice before including docker to your project and buying private repos for 7$ each.
So what we see in our Dockerfile:
```
# base image  
FROM node:12.2.0  
  
# install chrome for protractor tests  
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -  
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'  
RUN apt-get update && apt-get install -yq google-chrome-stable  
  
# set working directory  
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
**RUN** says to OS to get something from url and start some shell scripts and do update and install chrome or whatever you want. So this command do whatever you want to do with OS.
**WORKDIR**  define current working directory.
**ENV** add or edit environment variable.
**COPY** you can use ```RUN cp smth smth``` instead but better to write like documentation says. And its more readable to use Docker commands instead plenty **RUN**.
**CMD** it should be your last command in Dockerfile, that command says what this container does and for what all this stuff.

## Server

Open ```server.js``` file in your editor. Also you can test this by ```node server.js``` command.
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

My dear friend its not over, its only start of very wonderful adventure in angular world. If you're tired or dont want to spend your time in reading how it works you can skip next section. Its not problem if you dont read explanation, explanation for scared boys and I hope you are not scared boy. So dont read how to code, close this doc and just go to coding. "Luck loves the brave"


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
	> another file just for something i realy dont care
- tsconfig.spec.json
	> read above
- tslint.json
	> lint code for better code

**environments** folder contain two files, one for develope other for production, either contain the same structure but with different values.
**assets** folder contain fonts, icons, images, sccs files.

## Inside application
Here we go to the magic. Before we start I want to say that this code was written with love, its not joke , its realy true. You can find author by this nicknames (tomiho19, Kronus, sa1exx, pussyDestoyer, @sycablyad).

### Components
Its reuseable piece of combined ts, html, css etc. 
- charts
	> Contain models for charts, in our example for multiple radial chart and revenue radial chart.
- editable
	> This component for editing fields in table, in our project it was implemented at contractor page for cost, arrangment, amount columns.
- errors
	> Components for 404 and 500 errors
- notification
	> This component for notify user about errors, warnings, info, success. In right top corner, contain title and message and timeout about 1.5s. Injects notifcation service for handling notifications.

### Constants
Export something constant values such as numbers, strings and other primitive types. 

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
Auth guards provide security for routes, redirect to login page. Its like guard you know, you cannot to go inside application if you have not logged in

<!--stackedit_data:
eyJoaXN0b3J5IjpbNjU2MzE1NzM4LDIyOTIzMjg4MSwtMTE2NT
Y4MDExNywtMTA3NTUxMTcyMSwtMTg3NDQ2NDYxMywtMjUyNDE2
MjgsLTE2MzkwNjg2NDVdfQ==
-->