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
Auth guards provide security for routes, redirect to login page. Its like  a guard you know, you cannot go inside application if you have not logged in.
canActivate method checks user and returns boolean, if not logged in so redirect to login page with the return url.

### Helpers
Some helper classes for some needs.

- convert-case
	> Convert snake case to camel case. In our project we use python and js, so python uses snake_case and js uses camelCase.
- error-handler
	> notify user about error, calls notification service and says what to do
- request-handler
	> convert camelCase to snake_case before sending to api, and process callback
- response-handler
	> notify user about success, clear any errors that happend before
- router-stub
	> returns string url, was created for testing services
- utility
	> some additional functions for do something additional things...

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
Mock data for testing services, components. Export mock data generated by backend server. Mock files contain exactly copy of returned data from api.

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
Provide connection between application and Web API

- cookie.service
	> set, get values to cookies + expires
- storage.service
	> set, get value to local storage

### Services
Controllers for application, react to components changing, sending api calls.

- auth.service
	> service for authentication user. Getting, setting, removing user, token, instance. Request access token by refresh token, handle unauthorised.
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
	> Big, huge service CRUD for project, news, formats, hashtag. Initializing forms for this all stuf. Handling and processing data and payload for requests. This is a big service.
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

So that's it, services do a lot of work in app based on Angular methodology.

### Store

"Store is RxJS powered global state management for Angular applications, inspired by Redux. Store is a controlled state container designed to help write performant, consistent applications on top of Angular."

Lets see what is this and what it contains

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
In out project we have four layouts:

- footer
	> contain footer info something like that ```2015 - 2020 © UBold theme by Coderthemes```
- rightsidebar
	> we did not use this component at all, but there is some configurations for theme, styles etc
- sidebar
	> menu, links for navigate to pages
- topbar
	> notification menu, create new email tools etc

```layout.component``` is a container for pages, skeleton

### Pages
Pages contain some modules, its modular arhitecture.
Structure:
	
- account
- crm
- email
- extras
- form

#### Account
This module contain confirm, login, password reset, signup pages:

- confirm
	> Informs a user that him password was changed
- login
	> This component for login user in crm
- reset-password
	> This component for change user password
- signup
	> This component for sign up new user

#### CRM
This module contain burst-news, clients, contractors, projects, publications, reports, users pages

- burst-news
	> This component do a lot of work. Here we can create news wave which include news. News contain title, contractors and content, see **news.wave.model** . We can create one or many news wave for **news project**. 
- clients
	> This component for comfortable working with clients. Simple CRUD.
- contractors
	> This component do crud for contractor and many another actions such as partial update contractor for cost, amount, arrangment fields, multiple edit and delete.
- projects
	> Here we create news project for burst news. So we have one project and can create news waves for this project.
- publications
	> This component informs us about contractor preferences such as what contractor can publish or what contractor cannot publish or another special information
- reports
	> Here we see data of project and we can download, upload or remove report.xls file
- users
	> This component for watch full list of users in system, downgrade or upgrade user privileges

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
Contain validation reuseable components

- validation
	> regex, patterns, error-highlight

 
### Shared

This folder for sharing some common **directives**, **pipes** and **ui**

#### Directives
Contains reuseable directives for html tags with additional logic

- edit-mode
	> returns edit mode template
- editable-on-enter
	> set host listener and switch mode on event
- tickets-sortable
	> provide sort by column asc dsc
- view-mode
	> returns view mode template

#### Pipes
Contains reuseable pipes for processing complex logic in html

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
Thank you mate for reading this, have a nice day, love mom and dont worry about errors. And remember it's just a project, but how you do it will determine your future.


# How to start to contribute
You need to complete some steps for starting contribution

## Installation package manager
Please use nvm (node version manager), it's a very useful tool for managing your node and npm.

- Download the sh installation script
	> ```curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh ```
- Install the nvm
	> ```bash install_nvm.sh```
- Activate
	> ```source ~/.profile```
- Install a version
	> ```nvm install 8.11.1```
- Use a version
	> ```nvm use 8.11.1```

Yarn installation is pretty simple and you can follow the next steps from official documentation [here](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Installation dependencies
Go to the command line and install the dependencies using the command  `npm install`. This will install all the required dependencies. If you don't like ```npm``` you can use ```yarn``` and ```yarn install``` command.

## Serve project
This commands will serve your project to localhost:4200
- npm
	> ```npm run start:dev```
- yarn
	> ```yarn run start:dev```
- ng (angular-cli)
	> ```ng serve```

List of all available package.json commands:

- start (host build of project, located at dist folder, via express)
	>  ```node server.js```
- test (run karma testing in silence mode, it means without browser, just in a console)
	> ```ng test --watch=false --browsers=ChromeHeadlessCustom```
- ng (angular cli command, for example ```ng generate service example-service```, or short form ```ng g s example-service```)
	> ```ng g c test-component```
- clean (remove a build folder named ```dist```)
	> ```rimraf ./dist```
- start:dev
	> ```ng serve```
- build
	> ```ng build```
- build:prod
	> ```ng build --prod```
- test:watch
	> ```ng test```
- lint
	> ```ng lint```
- e2e
	> ```ng e2e```
- build:ci
	> ```npm run clean && npm run test && npm run build:prod```
- heroku-postbuild (duplicate of build:prod but needed for Heroku)
	> ```ng build --prod``` 
- format:fix (prettier formation)
	> ```pretty-quick --staged```
- precommit (calls every commit)
	> ```run-s format:fix lint```
- format:check
	> ```prettier --config ./.prettierrc --list-different "src/{app,environments,assets}/**/*{.ts,.js,.json,.css,.scss}"```

## Develop new feature
We are using ```git flow``` tool. [Here](https://danielkummer.github.io/git-flow-cheatsheet/index.ru_RU.html) is a documentation for using.

- init git-flow 
	> ```git flow init```
- start new feature (every time you want to create something new, for example, a new page, or fix bugs, or redesign)
	> ```git flow feature start FEATURE_NAME_HERE```
- finish feature (before this command you should commit and push all changes)
	> ```git flow feature finish```

## Make new release
Release a new version of the application

- start new release
	> ```git flow release start RELEASE_NAME_HERE```
- finish release
	> ```git flow release finish```
- push tags (always do this command after finish release)
	> ```git push --tags```


## Testing

First of all, you should read a book called [Refactoring](https://nnmclub.to/forum/viewtopic.php?t=1298698).
We are testing the application via [Karma](https://angular.io/guide/testing), and let's talk about testing in details

### Service testing
Here is an example of testing auth.service
```
  
describe('AuthenticationService', () => {  
  let injector: TestBed;  
 let service: AuthenticationService;  
 let httpMock: HttpTestingController;  
 const api = environment.api;  
  
  beforeEach(() => {  
    TestBed.configureTestingModule({  
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],  
  providers: [  
        UserService,  
  FormBuilder,  
  PaginationService,  
  CookieService,  
  RequestHandler,  
  {  
          provide: ActivatedRoute,  
  useValue: {  
            snapshot: {  
              queryParams: {  
                returnUrl: {  
                  get(): string {  
                    return '';  
  },  
  },  
  },  
  },  
  },  
  },  
  { provide: Router, useClass: RouterStub },  
  ],  
  schemas: [NO_ERRORS_SCHEMA],  
  });  
  injector = getTestBed();  
  service = injector.get(AuthenticationService);  
  httpMock = injector.get(HttpTestingController);  
  });  
  
  afterEach(() => {  
    httpMock.verify();  
  });  
  
  describe('#login', () => {  
    it('should return an Observable', () => {  
      service.login(mockLogin).subscribe((user) => {  
        expect(user).toBeTruthy();  
  });  
  
 const req = httpMock.expectOne(`${api}/login/`);  
  expect(req.request.method).toBe('POST');  
  req.flush(mockUser);  
  });  
  });  
  
  describe('#logout', () => {  
    it('should return an Observable', () => {  
      service.logout();  
  expect(service.user).toBeFalsy();  
  });  
  });  
});
```
- let injector: TestBed; - "Configures and initializes environment for unit testing and provides methods for creating components and services in unit tests." and "`[TestBed](https://angular.io/api/core/testing/TestBed)`  is the primary API for writing unit tests for Angular applications and libraries.
Note: Use  `[TestBed](https://angular.io/api/core/testing/TestBed)`  in tests. It will be set to either  `TestBedViewEngine`  or  `TestBedRender3`  according to the compiler used." what does it mean? How to use it? I don't know, I'm using it and that's all )) 
	> ```injector = getTestBed();``` - initialiazation
	> ```service = injector.get(AuthenticationService);``` - functional decomposition (it means our service can do more with TestBed, some new methods, and functional)
	> ```httpMock = injector.get(HttpTestingController);``` - mock data (mock means unreal data from server, emulated data)
	> ```afterEach(() => {  httpMock.verify();  });``` - emulate new data before every test
- TestBed.configureTestingModule({... 
	> ```imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]``` - required imports, HttpClientTestingModule for testing http, ReactiveFormsModule for html forms, FormsModule for another html components such as input, checkbox and other
- ```providers: [UserService,  FormBuilder,PaginationService,CookieService,  RequestHandler,...``` - required services, UserService just another service, FormBuilder service for creating forms, PaginationService means pagination service, CookieService for a managing cookies, RequestHandler is a helper service
- ```  
  ...{ provide: ActivatedRoute,  
		  useValue: {  
		    snapshot: {  
		      queryParams: {  
		        returnUrl: {  
		          get(): string {  
		            return '';  
  },  
  },  
  },  
  },  
  },  },``` - required thing, dont remember exactly for what probaly for redirect to another route
  
- ```{ provide: Router, useClass: RouterStub },``` - another required thing for routing
-	```schemas: [NO_ERRORS_SCHEMA],``` - prevent not required errors
- ```
	describe('#login', () => {  
  it('should return an Observable', () => {  
    service.login(mockLogin).subscribe((user) => {  
      expect(user).toBeTruthy();  
  });  
   const req = httpMock.expectOne(`${api}/login/`);  
  expect(req.request.method).toBe('POST');  
  req.flush(mockUser);  
  });  }); 
  ----------------------------------------------------------------------
	-  its how test looks like, here we see title the '#login'
  and another title 'should return an Observable'. 
  service.login(mockLogin) here we pass mock data to login method
  mockLogin looks like:
	  export const mockLogin = {  
	  data: {  
	    email: 'email',  
	  password: 'password',  
	  },  
	};
	expect(user).toBeTruthy(); - here we expect returned from login method user to be truthy
	const req = httpMock.expectOne(`${api}/login/`); - initialization expection
	expect(req.request.method).toBe('POST'); - here we expect request to be called by post method
	req.flush(mockUser); - here we pass mock user to response


That's all testing services, how you can see it's pretty easy, so copy and paste this code to achieve good testing.

### Component testing
Here is an example of testing login.component
```  
describe('LoginComponent', () => {  
  let component: LoginComponent;  
 let element: HTMLElement;  
 let fixture: ComponentFixture<LoginComponent>;  
 const loginPayload = { data: { email: 'login', password: 'password' } } as LoginPayload;  
  
  // * We use beforeEach so our tests are run in isolation  
  beforeEach(() => {  
    TestBed.configureTestingModule({  
      // * here we configure our testing module with all the declarations,  
 // * imports, and providers necessary to this component  imports: [  
        SocialLoginModule,  
  CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, RouterTestingModule, StoreModule.forRoot({})  
      ],  
  providers: [{  
        provide: 'SocialAuthServiceConfig',  
  useValue: {  
          autoLogin: false,  
  providers: [  
            {  
              id: GoogleLoginProvider.PROVIDER_ID,  
  provider: new GoogleLoginProvider(environment.googleClientId),  
  },  
  {  
              id: FacebookLoginProvider.PROVIDER_ID,  
  provider: new FacebookLoginProvider(environment.fbAppId),  
  },  
  ],  
  } as SocialAuthServiceConfig,  
  }, HttpClient, HttpHandler, FormBuilder, AuthenticationService, Title, ErrorService, LoadingService, Store],  
  declarations: [LoginComponent]  
    }).compileComponents();  
  
  fixture = TestBed.createComponent(LoginComponent);  
  component = fixture.componentInstance; // The component instantiation  
  element = fixture.nativeElement; // The HTML reference  
  
  spyOn(component, 'submit');  
  });  
  
  it('should create', () => {  
    expect(component).toBeTruthy();  
  });  
  
  it('should initSubscriptions', () => {  
    component.initSubscriptions();  
  expect(component.loading$).toBeTruthy();  
  expect(component.error$).toBeTruthy();  
  });  
  
  it('should initForm and return controls', () => {  
    component.initForm();  
  expect(component.loginForm).toBeTruthy();  
  expect(component.loginFormControls).toBeTruthy();  
  });  
  
  it('should handle onSubmit', () => {  
    component.onSubmit();  
  expect(component.submitted).toBeTruthy();  
  });  
  
  it('should submit', () => {  
    component.submit(loginPayload);  
  expect(component.submit).toHaveBeenCalled();  
  });  
  
  it('should setTitle', () => {  
    component.setTitle(component.title);  
  fixture.detectChanges();  
  expect(document.title).toContain(component.title);  
  });  
}); 
```
- ```let component: LoginComponent;``` - definition of type, suppose to be a LoginComponent
- ```let element: HTMLElement;``` - definition of type, suppose to be a HTMLElement
- ```let fixture: ComponentFixture<LoginComponent>;``` - definition of type, suppose to be a ComponentFixture<LoginComponent>
- ```const loginPayload = { data: { email: 'login', password: 'password' } } as LoginPayload;``` - mock login payload
- ```imports: [SocialLoginModule, CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, RouterTestingModule, StoreModule.forRoot({})]```
	> SocialLoginModule means login via google or facebook
	> CommonModule means some common things for angular app
	> ReactiveFormsModule means forms, reactive forms
	> NgbAlertModule one of many bootstrap modules
	> UIModule ui module, we use some legacy ui module from ubold
	> RouterTestingModule for testing routers
	> StoreModule its a module for the NgRx library
- ```providers: [{ provide: 'SocialAuthServiceConfig', ....``` - dont remember for what it is
- ```useValue: {  autoLogin: false,  providers: [  {  id: GoogleLoginProvider.PROVIDER_ID,  provider: new GoogleLoginProvider(environment.googleClientId)  },  {  id: FacebookLoginProvider.PROVIDER_ID,  provider: new FacebookLoginProvider(environment.fbAppId)  }  ]  } as SocialAuthServiceConfig``` - some configuration for login via google and facebook
- ```providers: [..., HttpClient]``` - provider for testing http, here we dont test http, so we can use simple http instead httpTesting
- ```providers: [..., HttpHandler]``` - another http testing provider for something
- ```providers: [..., FormBuilder]``` - provider for building forms
- ```providers: [..., AuthenticationService]``` - service for authentication
- ```providers: [..., Title]``` - set window title service
- ```providers: [..., ErrorService]``` - error service, for handling errors
- ```providers: [..., LoadingService]``` - loading service, for handling loading
- ```providers: [..., Store]``` - store service, for somethings
- ```declarations: [LoginComponent]``` - here we declare our component
- ```fixture = TestBed.createComponent(LoginComponent);``` - component decomposition for testing
- ```component = fixture.componentInstance;``` - The component instantiation
- ```element = fixture.nativeElement;``` - The HTML reference
- ```spyOn(component, 'submit');``` spy on some method of component
- test some method to have been called and expect some fields to contain something
```
it('should submit', () => {  
  component.submit(loginPayload);  // call the method
  expect(component.submit).toHaveBeenCalled();  // expect to have been called
});  
  
it('should setTitle', () => {  
  component.setTitle(component.title);  // do something
  fixture.detectChanges();  // detect changes
  expect(document.title).toContain(component.title);  // expect component to contain some value
});
```

### Pipe & directive testing
Here we go to a pipe and directive testing

```
describe('ContractorsCostPipe', () => {  
  it('should create', () => {  
    const pipe = new ContractorsCostPipe(); // * pipe instantiation  
  expect(pipe).toBeTruthy();  
  });  
  
  it('should return contractors cost', () => {  
    // * arrange  
  const pipe = new ContractorsCostPipe();  
  // * act  
  const data = [mockContractor, mockContractor] as unknown as Contractor[];  
 const result = pipe.transform(data, [], 'article');  
  // * asser  
  expect(result).toBe(0);  
  });  
});
```
- ```    const pipe = new ContractorsCostPipe(); // * pipe instantiation  ``` - initialiazition 
- ```expect(pipe).toBeTruthy();  ``` - expect to be truthy, it means pipe's been created
- ```const data = [mockContractor, mockContractor] as unknown as Contractor[];``` - some mock data
- ```const result = pipe.transform(data, [], 'article');``` - result of transformation
- ```expect(result).toBe(0);``` - expection

```
describe('TicketsSortableDirective', () => {  
  it('should create an instance', () => {  
    const directive = new TicketsSortableDirective();  
  expect(directive).toBeTruthy();  
  });  
});
```
- ```    const directive = new TicketsSortableDirective();  ``` - initialization
- ```expect(directive).toBeTruthy();``` - expection

## Conclusion
So now we can develop and test our components, services, pipes, and directives. Happy coding, have fun, good luck
