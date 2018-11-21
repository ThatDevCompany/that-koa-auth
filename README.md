# That Koa Auth
[![CircleCI](https://circleci.com/gh/ThatDevCompany/that-koa-auth.svg?style=svg)](https://circleci.com/gh/ThatDevCompany/that-koa-auth)
##  Overview
A lightweight and extendable AuthN and AuthZ library for Koa Applications

##  Main Concepts
The following primary concepts are defined by this library:-

* **Context** - *WHO* is aiming to act and within which *NAMESPACE*
    * **User** - a type of *WHO* - a known person
    * **Guest** - a type of *WHO* - a unknown person
    * **System** - a type of *WHO* - the system itself
    * **Tentant** - another word for the *NAMESPACE* - meta-set of data
    
* **Authentication / AuthN** - the process of determining the Context of a request
    * **Authenticator** - a class capable of performing AuthN

    
* **Authorization / AuthZ** - the process of determining whether the given Context
has access to perform the request it is attempting to make
    * **Authorizer** - a class capable of performing AuthZ
    * **Permission** - an atomic unit used in all ACL systems

* **AuthService** - a service class offering the application specific functions needed for 
authenticators and authorizers to do their job

## Authenticators
A number of authenticators are provided by the package:-

* **Cognito Authenticator** - an authenticator which, given a Cognito Identity token,
will authenticate the user with Amazon Cognito - to implement this Authenticator, the applications
AuthService must be extended to implement the CognitoAuthNService

* **Facebook Authenticator** - an authenticator which, given a Cognito Federated Identity token,
will authenticate the user with Facebook via Amazon Cognito - to implement this Authenticator, the applications
AuthService must be extended to implement the CognitoAuthNService

* **Google Authenticator** - an authenticator which, given a Cognito Federated Identity token,
will authenticate the user with Google via Amazon Cognito - to implement this Authenticator, the applications
AuthService must be extended to implement the CognitoAuthNService

* **Password Authenticator** - an authenticator which, given a username and password
will authenticate the user with a custom service provider - to implement this Authenticator, the applications
AuthService must be extended to implement the PasswordAuthNService

* **Token Authenticator** - an authenticator which, given a token
will authenticate the user with a custom token provider - to implement this Authenticator, the applications
AuthService must be extended to implement the TokenAuthNService

## Authorizers
A basic authorizer is provided by the package.

This authorizer adds the concept of **Roles** where a Role can have a number of
permissions

To implement this Authorizer, the application's auth service must be extended
to implement the BasicAuthZService

## AuthService
The key to this package is the AuthService

The AuthService connects the common functionality of the Authenticators and Authorizers
to the application itself.

For example. To create a Password Authenticator for my application, I would:-

```
    const myPasswordAuthN = new PasswordAuthenticator(myAuthService)
```

So, what does myAuthService need to provide? This varies; each Authenticator and Authorizer
might have unique demands (listed above).

So, lets say I want to use the PasswordAuthenticator, the TokenAuthenticator and the BasicAuthorizer.

In this case, my AuthService needs to implement the PasswordAuthNService, the TokenAuthNService and the BasicAuthZService

As such, my AuthService might look as follows:-

```
    cont MyAuthService = {
        // The following is neeeded for PasswordAuthN
        async findUserByIdentity(tenantId: string, identity: string) {
            ... some code goes here ...
        }
        
        // The following is neeeded for TokenAuthN
        async findUserByToken(token: string) {
            ... some code goes here ...
        }
        
        // The following is neeeded for BasicAuthZ
        async getRolesForContext(uctx: Context) {
            ... some code goes here ...
        }
    }
    
    const myPasswordAuthN = new PasswordAuthenticator(MyAuthService)
    const myTokenAuthN = new TokenAuthenticator(MyAuthService)
    const myAuthZ = new BasicAuthorizer(MyAuthService)
```

Now we can bolt myPasswordAuthN, myTokenAuthN and myAuthZ into our
app using the plugins and decorators listed below.

## Plugins
### Koa AuthN
The koaAuthN plugin will add a User Context to the main Koa context

```
import * as Koa from 'Koa'

const app = new Koa()
app.use(koaAuthN(MyAuthenticator))
```

Then, from any Koa service:-

```
    (ctx, next) => {
        
        const { type, userId, tenantId } = ctx.uctx
        
        if (ctx.uctx.isGuest) {
            ...
        }
        
        if (ctx.uctx.isUser) {
            ...
        }
        
        if (ctx.uctx.isSystem) {
            ...
        }
        
    }
```

### Koa Apollo AuthZ
The Apollo AuthZ plugin provides the developer with a convenient way of adding security to
apollo resolvers

```
const MyApolloQuery = {
    type: MyApolloType,
    args: { id: { type: GQL.GraphQLString } },
    resolve: apolloAuthZ(
        MyAuthorizer,
        (_, { id }, uctx) => {
            ... resolver code goes here ...	
        }
    )
}
```

Please note, however, in order for the user context to be added, we must add a context
handler to the ApolloServer during instantiation using the apolloContext plugin

```
    const myApolloServer = new ApolloServer({
        schema: MySchema,
        context: apolloContext()
    })
```

### Koa OAI AuthZ
The Koa OAI AuthZ plugin ensures that only authenticated users are allowed access to certain
REST endpoints

Set up is simple, for example:-

```
    import * as oaiRouter from 'koa-oai-router'
    import * as oaiMiddleware from 'koa-oai-router-middleware'
    import * as oaiValidator from 'koa-oai-router-parameters'

    const oaiApi = new oaiRouter({
		apiDoc: `${__dirname}/openapi`,
		options: {
			middleware: `${__dirname}/openapi/controllers`,
			parameters: {},
			auth: {
				authorizer: MyAuthorizer
			}
		}
	})
	oaiApi.mount(oaiAuthZ)          // NB: AuthZ should go first
	oaiApi.mount(oaiValidator)
	oaiApi.mount(oaiMiddleware)

	// Attach OAI router
	app.use(oaiApi.routes())
```


## Decorators
A SecureMethod decorator provides the developer with a convenient way of adding security to
class methods.

For example:-

```
    class MyClass {
        @SecureMethod(myAuthorizer, [myPermission1, myPermission2])
        myMethod(uctx: Context, myArg1, myArg2) {
            ... some code ...
        }
    }
    
    const myInstance = new MyClass()
    
    // Assume guest users don't have myPermission1 or myPermission2
    const guest = Context.Guest()
    myInstance.myMethod(guest, 'a', 'b')
    // The above will throw an error
    
    // Assume user 1234 has all permissions
    const user = Context.User('1234')
    myInstance.myMethod(user, 'a', 'b')
    // The above will work
```