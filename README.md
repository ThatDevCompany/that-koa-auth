# That Koa Auth

##  Overview
A lightweight and extendable AuthN and AuthZ library for Koa Applications

### AuthN middleware
The following will attach the AuthN middleware to the Koa Application

```
import * as Koa from 'koa'
import { authn } from 'that-koa-auth'
import { mySecurityDAO } from './mySecurityDao'

const app = new Koa()

app.use(authn(mySecurityDAO))
```

The middleware adds an AuthContext to the request context

```
    ctx.uctx
```

### Security DAO
The Security DAO provides access to Users, AuthTokens and Tenants for the
given applicaiton

```
export interface SecurityDAO {
	findUserById(tenantId: string, id: string): Promise<User>
	findUserByIdentity(tenantId: string, identity: string): Promise<User>
	findAuthTokenById(id: string): Promise<AuthToken>
}
```

### SecureMethod
Any method can now be made secure by decorating it with the SecureMethod

```
import { Context } from 'that-koa-auth'
import { mySecurityDAO } from './mySecurityDao'
import { canDoThing } from './myPermissions'

class MyClass {
    @SecureMethod(mySecurityDAO, canDoThing)
    myMethod(uctx: Context) {
        // Do things that only users who canDoThings can do
    }
}
```

### Users, AuthTokens, Tenants, Permissions and Roles
More info coming soon, but basically theres a bunch of Interfaces
to be implemented within the consuming application
