## quality of life changes
- a notepad on the side for research
- interactive elements not too close together
- article preview with image and content
- search bar preview with title and content

## error handling
- grey out login/register button on invalid form (also validate the form)

## Conventions to un-break
- enter button does submit

## Conventions to break retroactively in demos 1 and 2
- actually break the logo=homelink convention
    - use a non-sensical icon for the home links
- put navigation at the bottom
- use different names for login/register

## TODOS
- handle http errors for user service
- 404 page
- make submit buttons react to enter key
- save settings like url strings in a separate config file
- restrict file upload types
- adjust other BlogpostsController methods
- allow UNDO for image upload and adding new text section
- add labels to create page entries
- create page: make the first input have bigger font size (2em)
- undo slowdown navigation via function, user routerLink again
- take paths form a config file dynamically
- make a header component
- change empty search bar behaviour to share lead to all posts
- todo: don't allow editing once when logging out on a view page

## What does the initial homepage need?
- login button
- register button
- title
- create blogpost button
- list of all existing posts

### Design Specs
- only black white and #efefef
- font: inter
- font sizes: 32, 18, 16