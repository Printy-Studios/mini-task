---

id: create-typedef-for-issue-object

---

# create-typedef-for-issue-object

Due to rewriting minitask to plain JS, we have lost our type definitions (well, 
they're still there in the `/types` folder). So we gotta add back the typedefs
and their uses in JSDoc comments.

Update: It was possible to use the new TypeScript syntax:

```
/** @import { Issue } from '../types/Issue' */
```

to import types without needing to convert them to JSDoc typedefs.