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
 

## Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.


# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

There are two types of synchronization and they can complement each other:

- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
	> To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
	> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

## Open a file

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Save a file

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.

## Synchronize a file

Once your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.

If you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.

> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.

## Manage file synchronization

Since one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.


# Publication

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

> Before starting to publish, you must link an account in the **Publish** sub-menu.

## Publish a File

You can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:

- Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),
- HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).

## Update a publication

After publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.

> **Note:** The **Publish now** button is disabled if your file has not been published yet.

## Manage file publication

Since one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.


# Markdown extensions

StackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.


## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|


## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).


## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNzk0MTI4MzMsLTEwNzU1MTE3MjEsLT
E4NzQ0NjQ2MTMsLTI1MjQxNjI4LC0xNjM5MDY4NjQ1XX0=
-->