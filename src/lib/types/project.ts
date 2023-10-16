import type { User } from "$lib/types/user"

export type Project = {
  name:string,
  slug:string,
  html:string,
  css:string,
  js:string,
  owner: User
}
