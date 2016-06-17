# Ledgend

Search app directory key words
`Que?:`
* returns inline questions

`_Tip:`
* returns inline tips

# Resources
https://github.com/coryhouse/pluralsight-redux-starter

__Que?: Review this points.__
Automated Testing
Linting
Minification
Bundling
JSX compilation
ES6 transpilation
React:
* clear component model
* virtual dom
* synthetic events
* ability to think about your app in terms of small pure functions

Q: component composition model?


# Babel
* transpiles ES6 to ES5
* requires multiple files so can't list a single version, that said, in this course we are using babel 6.

## Babel-polyfill
* some features of ES6 require polyfill
* quick large 50K minified
* can pull in only the polyfills you need

check out:
https://babeljs.io/
* to find all features that require babel polyfil.

# Webpack
*  bundler
* extremely powerful and extensible
* bundle our compiled javascript into a single minified file in the browser.
* bundle our app for the web
* webpack.config.dev.js in root of app.
* bundling our code so that the browser can work with node modules that it otherwise couldn't understand
# Mocha
* testing framework
*

# ESLint
Q: What is linting?
* alerts us when we make mistake in our code.
* reporting any issues to our command line whenever we hit save. So we only have one place to check for any issues.
* hels us catch mistake, maintain consistency, and enforce best practices.

* we could simply run eslint directly in an npm script, but eslint lacks watch functionality, so instead we are using a handy npm package called eslint watch which has an executable called esw. eslint watch wraps eslint and provides file watching functionality, it also offers enhanced command line output. We are specifying the path to the binary, which shouldn't be necessary, but others have reported issues in the past without it

# Hot Reloading
* likely to change again...
* mutliple ways to handle
* babel preset react hmre
	* wraps up a number of other libraries and settings in a single preset - pretty easy to set up
	* wraps components in a custom proxy using babel.
	* proxies are classes that act just like you classes - but they provide hooks for injecting new implementations
	* when you hit save your changes are immediately applied without requiring a reload
	* this is experimental, likely to be better ways to handle this in future
	* does load functional components.

# NVM
* allows you to run multiple versions of node

Can usually ignore the npm install warnings, optional dependencies.

# NPM scripts
* simple
* no extra layer of abstraction
* eliminate dependence on separate plugins
* simpler debugging
* better documentation
    * one place to check for documentation

# Files
`.editorconfig`

* EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

`.babelrc`
* for configuring babel
* very simple usually
* react preset and es2015
	* we are configuring babel to transpile anything that is part of the ES2015 standard
	* react-hmre is for hot-reloading
		* only in the dev environment.

```
{
  "presets":["react", "es2015"],
  "env":{
    "development":{
      "presets": ["react-hmre"]
    }
  }
}
```


`.eslintrc`
* for configuring eslint

`tools/testSetup.js`
*

# Terminal Commands
`npm start -s`
* - s means silent
* suppresses a lot of the noise you might see otherwise on the command line.

`npm run lint:watch`
* not eslint is watching our files
* the moment I hit save, eslint picks up on changes and displays feedback in the console.

# Environment:
Powerful and rapid feedback development environment
Transpiling via babel
Bundling via webpack
Linting via eslint
Testing via mocha
Serving the app via express
And tying everything together via npm scripts

# Components in React
## Four ways to create
### ES5 createClass
	* autobind
	```
	<div onClick=-{this.handleClick}></div>
	```

```
var HelloWorld = React.createClass({
	render: function(){
		return(
			<h1>Hello World</h1>
			);
		}
	});
```
### ES6 class
	* no autobind, can handle this a few different ways
	```
	<div onClick={this.handleClick.bind(this)}></div>
	```
	this is way is better for performance reasons
	linting rules have been set up in this course to insure binding is done this way.
	```
	class Contacts extends React.Component{
		constructor(props){
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}
	}
	```
	* propTypes and Default props are declared separately below your class definition
	* set initial state function is not used in ES6 classes. Instead,  you set the initial state in the components constructor. This is exactly where you would expect to initialize state.
	* must understand  

### ES5 stateless functional component
```
var HelloWorld = function(props) {
	return (
		<h1>Hello World</h1>
	);
};
```
* simply define a function, and React assumes that the return statement is your render function.
* the only argument is the props passed in
* if you component doesn't need:
	* to manage state
	* utilize component lifecycle methods
	* or do performance optimizations
	* you can declare a stateless functional component
* exactly what their names says
* no state, and get data soley from props which are immutable

### ES6 stateless function

```
const HelloWorld = (props) => {
	return (
		<h1> Hello World</h1>
	);
});
```
* use `const` keyword when declaring stateless functions in ES6
* should avoid the `var` keyword, should use `let` or `const` to make sure our component isn't accidentally reassigned
Q: what is the difference between `let` and `const`?
* can use the function key word if you prefer.

## Benefits of Stateless functional Components
1. No class needed
2. lets you avoid the `this` keyword. it's just a function. Easier to understand wthout the `this` keyword
3. good for dump presentation components. Focus on the UI rather than the behaviour. AVOID USING STATE IN PRESENTATIONAL COMPONENTS. Instead, state should be managed by higher level container components or via `flux`, `redux`, etc. Don't support state or lifecycle methods and this is a good thing, because it protects us from laziness. Always tempting to add a little state to a representational component when you are in a hurry - it's a quick way to hack in a feature. since they don't support local state, you can't hack in some state in a moment of laziness. Thus, stateless functional components help to programmatically enforce keeping our component pure. forcing us to put state management where it belongs - in higher level container components
4. Requires less typing. Less noise. "Great code maximizes the signal to noise ratio"
Q: check out clean code course. What does noise mean exactly in this context? Signal to noise ratio?
5. Enhanced code completion / intellisense
Q: A little confused about this one.
6. Bloated components are obvious. A Function that takes a lot of parameters is a code smell. When you use ES6 de-structuring with your stateless Components - the argument list clearly conveys your components dependencies. Thus, it's easy to spot components that need attention. In this case you can either break out the component or rethink the sats structure that you are passing around.
7. Easy to understand. Simply a function that takes props and spits out html. even if it contains a lot of markup. It's conceptually simple, it's a pure function.
8. Easy to test. You assertions/expects are very straight forward. Given these values for props, i expect it to return this markup
9. performance. since there is no state or lifecycle methods to worry about. the react team plans to avoid unnecessary checks and memory allocations in future releases.

Improved performance, superior syntax, testibility, and readibility.

### When to use stateless functional components?
* Use them whenever possible!
* stateless functional compoenet doesn't actually create a component instance, so `ref` will always return null, within a stateless component.
* nesting functions in functions in a stateless component can hurt performance. Because every render creates a new instance of that function. so if you need to nest functions. Consider using a class component instead.

state
refs
lifecycle methods

If you don't need anything mentioned above, use a stateless component!

## Other ways to create components
Q:__research below. Can stick to the two ES6 styles__ instead.
Object.create
Mixins
Parasitic Components
StampIt
bit.ly/react-define-component
* see this url for more details about the above.

Again, check out the clean code course.

## Container vs Presentation Components

_Tip: "When you notice that some components don't use props they receive but merely forward them down..it's a good time to introduce some container components"_

__Alternative Jargon:__

Container 		- Presentational

Smart 			- Dumb

stateful		- Stateless

Controller View - View

### Container Components
* behaviour
* q: marshalling data?
* actions
* little or no markup
* "the back end of the front end"
* __components don't have to emit DOM__
* primarily concerned with passing data and actions down to their children, this means they are typically stateful.
* typically stateful
* when working in redux, container components are typically created using reduxes connect function at the bottom of the file.
* Some people like to place container components in separate folders from their presentation components
	* some organize by feature. With this approach, container and presentation components sit in the same folder.
* knows about redux - have redux specific code inside, to dispatch actions to the store and connecting to the store via connect.
Q: What is the store?
* often stateful, because they need to manage state

### Presentation Components
* nearly all markup
* shouldn't have logic inside
Q: Is there a difference between markup and logic? What is it exactly?
* receives data and actions from container components via props
* presentation components typically know nothing about redux. This makes presentation components more reusable and easier to understand.
* just relies on props to display UI
* has no dependencies on the rest of the app. Such as redux actions or stores
* does not specify how the data is loaded or mutated
* typically stateless functional components. Because they have no need for state. This keeps their definitions clean, light, should also improve performance in future versions of react, becaue lifecycle related logic does not need to run for these components
* should try to make most of components presentation components

# Redux

_TIP: a chat with redux video is a great demonstration of unidirectional data flow with redux._

_TIP: check out redux docs, there are ways to reduce boiler plate code_

## Redux Flow
1. Action is dispatched from component
	* dispatch an action
2. action creator createCourse in courseActions.js
	* lands in our createCourse action creator
3. reducer courseReducer in courseReducer.js
	* action is handled in our course reducer
	*
Que?
	How does courseActions know about the courseReducer?
	What triggers the courseReducer?
	How do we wire up the reducer?
	How do we set up action handling with reducers?

4. mapStateToProps in CoursePage.js
	* pull newly updated state
	* map it to our courses property
Que? this function is called because the redux store was update with new state?

5. render function in CoursePage component
	* after our mapStateToProps ends up injecting new data for our component


## Container
* focus on how things work
* only components in system that are aware of redux at all
* dispatch redux actions
* not typically written by hand.
	* you could write one by hand
	* just a react component that uses `store.subscribe` to read a part of the redux state tree and supply props to child components
* generated via react-redux(redux provides many performance optimizations for you.)


## Presentation
* focus on how things work
* unaware of redux
* invoke callbacks on props
* not tied to a specific behaviour
* behaviour is passed down from a container component via props.
* written completely by hand
* stateless functional components
* all they often need is a render function to define their markup.

## React-Redux
### Provider
* attaches app to store

```
<Provider store={this.props.store}>
	<App/>
</Provider>
```

* we use the provider component to wrap your applications top level component
* this makes the store available to all components automatically.

### Connect
* creates container components
* generates container components for you
* wraps a component so it's connect to the redux store.
* accepts two parametes, both of which are functions. And both of these parameters are optional
* calling connect on your component automatically adds a dispatch prop to your component.

ex.1
```

function mapStateToProps(state, ownProps) {
	return {appState: state.authorReducer };
}

export default connect(
	// State you would like to expose to your component.
	mapStateToProps,
	// Actions you would like to expose
	mapDispatchToProps
	)(AuthorPage);
```

ex.2
```
function mapStateToProps(state){
	return {
		appState: state
	};
}
```

* With this function we can determine what part of the store we want to attach to a component as props.
* And, we declare what actions we want to expose on props as well.

#### mapStateToProps

#### mapDispatchToProps()

* receives displatch as it's lone parameter
* it returns the callback props that you want to pass down

##### 3 Ways to Handle mapDispatchToProps
1. Ignore it. Use dispatch
	* optional parameter in the connect function
	`this.props.dispatch(loadCourses());`
	* when you omit it, then the dispatch function will be attached to yoru container component
	* this means you can call dispatch manually and pass it an action creator

* calling connect on your component automatically adds a dispatch prop to your component.
* you can use this dispatch prop to call your action creators. like so:

`this.props.dispatch(loadCourses());`

__there are a couple downsides with this approach__

__Two Downsides__
i. Boilerplate
* requires more boiler plate each time you want to fire off an action, because you have to explicitly call dispatch, and pass it the action you'd like to fire.

ii. Redux concerns in child components
* this means your child components need to reference redux specific concepts, like the dispatch function as well as your action creators.
* if you want to keep your child components as simple as possible, and avoid tying them to redux. Then this approach is not ideal.q



2. Manually Wrap your Action Creators in Dispatch calls
* here I am specifying the actions I want to expose to my component explicitly.
* one by one I wrap each action creator in a dispatch call.
* use this way when getting started, makes it very clear what you are doing.
* that said, this way is a little redundant.
Q: how is this way redundant exactly?
```
function mapDispatchToProps(dispatch){
	return {
		loadCourses: () => {
			dispatch(loadCourses());
		},
		createCourse: (course) => {
			dispatch(createCourse(course));
		},
		updateCourse: (course) => {
			dispatch(updateCourse(course));
		}
	};
}

//In component...
this.props.loadCourses()
```
* keeps the calls in my actually component shorter, at the cost of some extra coding here in mapDispatchToProps.

3. Use bindActionCreators()
* ships with redux to handle the redundancy of option 2.
* wraps all the actions passed to it, in a dispatch call for you.
* prop that is exposed to component in this example is called `actions`.
* convenience function which wraps your actino creators in dispatch calls for you.
* basically does what we are doing in option two automatically.

 ```
 function mapDispatchToProps(dispatch) {
	 return {
		 actions: bindActionCreators(actions, dispatch)
	 };
 }

 // In Component...
 this.props.actions.loadCourses();
 ```

 Approach 2. and 3. produce the same result. 3. is a more dry.

 In options 2. and 3. child components don't have to know anything about redux! A significant win over option 1.


#### Reselect (Library for Memoizing)
__If you are doing expensive work in mapStateToProps, consider adding the reselect library__

* memoizing for performance
* memoizing is about keeping track of the results of each function call, so that the function doesn't have to run again if it's already been run with the same parameters.
Q: Is this true in every case?
* memoization is like caching for function calls
	* each it's called, reselect just checks if it has already been called with the specified parameters. If it has it doesn't call the function. Instead it just returns the memoized value instead.
	* this is great for increasing performance because it eliminates the need for unnecessary expensive operations.

_TIP: if you are doing expensive calculations in your maps, for example:
* making a list
* doing expensive calculations

Memoization can make sure that these operations only occur when actually necessary._



## Do I need Redux?

* May find you are displaying the same data in multiple places
* large number of potential state changes that are hard to manage
* may find it useful to handle state changes in a single spot for consistency, testibility, and sanity!
	* this is where react with Redux really shines
* using React with Redux takes some time. handling more complex apps requires more time to set up the environment.
* testible, maintainable, and provides a rapid feedback experience.
* if you are writting an app that merely displays simple static data, redux isn't likely to be useful

Obvious sign you might need something like redux, is __you are using the same data in multiple places__.

__"If you aren't sure you need redux you don't need it"

__"Add redux when it feels necessary"__

### When React + Redux?
* Complex data flows
* Inter-component communication
	* between two components that don't have a parent child relationship
	* redux offers a clear and elegant solution
	* when you find two displarate componets are manipulating the same data, redux becomes really helpful
* Que?: non-heirarchical data
* many actions
	* as application offers an increasing number of actions
	* structure an scalability of redux in this case can become really useful.

## Redux 3 Core Principles
_Tip: Unidirectional Data flow philosophy:
Data flows down, actions flow up._
### One Immutable Store
* by immutable, I mean the state can't be changed
* aids debuggin
* supports server rendering
* and makes things like undo redo, easily possible

### Action Triggers Changes
* only way to mutate state is to emit an action that describes a users intent
e.g A user might click the submit contact form button and that would trigger a submit contact form action

### Reducers update State
* state is changed by pure functions
* these functions are called reducers
* in redux, a reducers is just a function that accepts the current state in an action and returns a new state.

## Redux Flow

### Action
* describes user intent
* object wth a type property and some data
* action must have a type property, the rest of it's shape is up to you
* actions trigger changes
* plain objects containing a description of an event:

```
rateCourse(rating) {
	return { type: RATE_COURSE, rating: rating }
}
```
In this example I am passing some data under a property called rating. This could be:
* a complex object
* a simple number
* a boolean
* any value that's serializable
Q: Serializable?

The only thing you shouldn't pass around in your actions are things that won't serialize to JSON like:
* functions
* promises

Actions are made by convenience functions called `action creators`. Here the action creator is called `RATE_COURSE`.

_typically the actions creator has the same name as the actions type_

Action Creators are considered convenience functions because they are not required. By using these action creators

By using these actions creators, the spot where you dispatch the action does not need to know the actions scructure.

Some example actions may be:
* LOAD_COURSE
* CREATE_COURSE
* DELETE_COURSE

Q: You can program your standard CRUD actions using actions?

__When actions are dispatched it ultimately affects what data is in the store__




### Store
* once the netw state is returned from a reducer, the store is updated
* immutable store
Q: what does this mean exactly?

In redux, you create a store by calling:
```
let store = createStore(reducer);
```
In your applications entry point
* you pass the createStore function to your reducer function.
Q: looking at the example above, I would say I am passing the reducer function to the createStore function as an argument...the tutorial says this backwards.


* simply stores data, while reducers handle the state changes
* single source of truth(makes application easier to manage and understand)

Redux store API is very simple, the store can:

`store.dispatch(action)`

`store.subscribe(listener)`

`store.getState()`

`storeReducer(nextReducer)`
* supports hot reloading

Notice there is no API for changing data in the store. This means the only way you can change the store is by dispatching an action. You can't change the store directly.

The store doesn't actually handle the actions that you dispatch.

Actions are ultimately handled by reducers.

#### Immutibility
To change state, return a new object.

If I can't mutate state, doesn't that mean that no data can ever change? Not at all. If just means that instead of changing your state object, you must return a new object that represents your applications new state.

Mutating State Example:
```
state = {
	name: 'Cory House'
	role: 'author'
}

state.role = 'admin';
return state
```

Non-Mutating State Example:
```
state = {
	name: 'Cory House'
	role: 'author'
}

return state ={
	name: 'Cory House'
	role: 'admin'
}

```
Here you can see we are returning an entirely new object.

This is important because Redux depends on immutable state to improve performance.

__Dont worry, you don't have to create a new copy of an object by hand every time you want to change it!__

##### Ways to create copys of objects in javascript
`Object.assign(target, ...sources)`
* ES6 method
* all browsers don't yet support this method
* creates a new object, but allows us to specify existing objects as a template
* first parameter is the target, and then it accepts as many source objects as you want

Ex.

```
Object.assign({}, state, {role: 'admin'});
```
Here I am saying:
* create a new empty object
* first param is the target, so we are jsut creating a new empty object
* then we are mixing our new object together with the existing state object
* also changing the role property to admin
* so result of this statement is effectively a clone of our existing state object but with the role property changed to 'admin'.

_Warning _Tip: When using Object.assign its easy to forget the first parameter should be an empty object. If you leave it out you'll end up mutating the state in stead of creating a new object._

* make sure you always pass an empty object as the first parameter when you are trying to make a deep copy of an object.

_Tip: Object.assign is an example of something babel can't transpile. So be sure to include babel-polyfill at the root of the app._

##### Why Immutibility?

###### Clarity
*  when state is updated, I know exactly where and how it happened.
* in the reducer
* you know someone wrote code somewhere in a reducer that returned a new copy of state
* you are clear about what file to open to actually see state changes
* in traditional apps, many files could potentially be manipulating state.
* in redux, you don't wonder where the state update occured.
* as long as you are using redux to handle all state changes. Then you know it occured within your reducers.

###### Performance
Consider an example with a large state object with many properties:

```
state = {
	name: 'Cory'
	role: ' author'
	city: 'Kansas'
	state: 'USA'
	...
}
```

If state weren't immutable, Redux would have to perform an expensive operation to determine if state had changed. It would have to check every property one by one to determine if state had actually changed.

If state is immutable, this expensive operation is no longer necessary. Instead, redux can simply do a reference comparison:

`if(prevStoreState !== storeState)...`

If the old state isn't referencing the same object in memory, then we know  that the state has changed.

__This is extremely efficient__

React-Redux provides a variety of complex optimizations behind the scences that rely on immutable state. This gives you a bunch of performance improvements for free.

###### Awesome Sauce
* helps support a truly amazing debugging experience.
Unlike many other technologies!
* time travel debugging is a powerful way to see exatly how your application state is changing over time.
* this means you can travel through time as you debug. you can go back in history and see each specific state change as it occured.
* as you go back in time, you can undo specific state changes and see how that changes the final state.
* you can even turn off individual actions that occured. So you can see what the state would look like if a specific action in history had never happened.


* time travel
* undo/redo
* turn off individual actions
* play interactions back

##### Handling Immutibility

###### ES6
* `Object.assign`
* Spread operator for arrays

Is the most popular approach.

###### ES5
* Lodash merge
* Lodash extend
* Object-assign

###### Libraries
* react-addons-update
* immutable.js

###### How do I enforce Immutability?
* trust(educate and trust your team)
	* if state is mutated in redux, it will introduce a bug.
* redux-immutable-state-invariant
	* display an error if you try to mutate state anywhere in your app.
	* only run this in developement, because it does a lot of object copying which would degrade performance. In production.
* to programmatically enforce immutability. You can use a library like immutable.js.
	* creates immutable javascript data structures
	* created by facebook
	* but can be useful on any project
	* powerful and interesting

##### Immutable Data Types
_Any time you try to change the value of any one of these types, a new copy is create_
Q: Is the old copy destroyed?
* number
* string
* Boolean
* Undefined
* Null

##### Mutable Data Types
* Objects
* Arrays
* Functions


### React

### Reducers
_TIP: Write independent small reducer functions that are each responsibile for updates to a specific slice of state. We call this pattern "reducer composition". A given action could be handled by all, some or none of them_

Q: Could possibly go through reducer section again...

* actions are ultimately handled by a reducer
* reducer is a fancy name for a function that returns new state
* typically contains a switch statement, that checks the type of the action passed, and determines what new state should be returned
* returns updated state

```
function myReducer(state, action) {
	// Return new state based on action passed
}
```

A reducer is a function that takes a state and an action and returns new state.

Example, that handles incrementing a counter:
_NO NO, this example mutates state!_
```
function myReducer(state, action){
	swith(action.type) {
		case 'INCREMENT_COUNTER':
			state.counter++;
			return state;
	}
}
```
_This example doesn't mutate state_
```
function myReducer(state, action){
	swith(action.type) {
		case 'INCREMENT_COUNTER':
			return (Object.assign(
				{},
				state,
				{counter: state.counter++}
			);
		)
	}
}
```

__Reducers must be pure__.

__You know you have a pure function if, calling it with the same set of arguments, always returns the same value__

Q: Pure function?

#### 3 things to Avoid in Reducers
1. Mutate Arguments
2. Perform side affects like:
	* API calls
	* routing transitions
3. Call non-pure functions
	* shouldn't call `Data.now` or `Math.rand` for example.

The return value of a reducer should depend solely on the return value of it's parameters.


## Asyn in Redux
### Why a mock API?
* simulates making asyn calls to the server
* convenience
* good for anytime you are building a client side app

#### Why?
1. allows you to start development immediately
* even if the api's you need to consume haven't been created yet.
*  as long as you can agree with the api team on the shape of the data that the final api's will return, then you can create a mock API and begin development.

2. lets you move independently when a separate team is handling the API
	* both teams don't have to move at the same pace
	* this means that you are not directly reliant on other developers delivering code in order to build the ui.
* if you are doing full stack dev, you get to decide when to build the API - it's no longer a blocking issue for building the ui.
	* makes life much easier for both teams
	* Que? coding to an interface rather than an implementation.

3. Easy Backup Plan
* if aPI is down or broken at any given time
* don't have to stop dev, can just point to the mock API and keep working.

4. Ultra-fast
* fastest way to handle rapid dev
* you can count on all responses being instantaneous if you like
* this means you are not hampered by slow or unreliable API calls in the earlier stages of dev.

5. Test slowness
* can test how the software will behave when API calls are really slow or really fast
	* using setTimeout within your mock api.

6. Aids Testing
* handy tool for automated testing
* since data is local, it's both fast and reliable
* don't have to mock calls, since your mock api is already a mock
* since data is deterministic, you can even write tests that utilize the data and they won't be slow since the test are local, all the data is just sitting in memory.

7. Point the real api later
* simply change the import at the top of your file.
* could even check a centralized config that allows you to toggle between the mock and real api's, via a single setting.

__for all these reasons it's a good idea to create a mock API for projects!__

### Asyn libraries
Three Most Popular Players for handling async calls in redux:
(these are 'middlware' libraries)

### redux-thunk (most simple to start, testing isn't the cleanest however)
__most to sagas when you feel pain points and get more comfortable with the power of generators__

* written by dan abromov, who also created redux
* allows you to return functions from your action creators instead of objects

* Can return functions instead of objects.
* A Thunk wraps an asychronous operation in a function
* Clunky to test
	* you have to mock api calls
	* no easy hooks for observing and testing individual steps in the asynchronous flow.
* conceptual simple / easy to learn
	* much like redux, the API service area is very small

Ex.1
* normally we can only return objects frm our function creators.
* with redux-thunk, we can return a function instead

* function that returns a function

__Thunk__
* computer science term
* a function that wraps an expression in order to delay it's evaluation.
* in this case, the deleteAuthor function is wrapping our dispatch function so that dispatch can run later

```
export function deleteAuthor(authorId) {
	return dispatch => {
		return AuthorApi.deleteAuthor(authorId).then(() => {
			dispatch(deletedAuthor(authorId));
			}).catch(handleError);
	};
}
```

### redux-saga
* Uses ES6 generators and rich domain specific language
* impressive and certainly worth looking into

* Handle async operations via generators instead
_TIP: Generators are functions that can be paused and resumed later.
* a generator can contain multiple yield statements
* at each yield the generator will pause._

* easier to test than thunks
	* can assert on their affects, because they simply return data.
	* you don't have to mock anything
	* therefore, your tests are generally more readable and clear.
* harder to learn than thunks
	* need to understand generators
	* and, a rather large API.
	* easy to introduce subtle bugs in your code, if you don't fully understand the affects and interactions that you choose to compose.
* Once you understand sagas well - it starts to make sense to choose sagas over thunks.
	* generators are elegant


### redux-promise (do not use)
* flux standard actions and promises
* still quite new, and the least popular of the three.

____

# Concepts

## Desctructuring
Allows you to break stuff apart into variables.


# Further Studying
https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.yl5i8teo0
