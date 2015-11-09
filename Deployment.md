# Introduction #

Most scripts developed here end up in http://zetaprints.com/java as explained in this [help post](http://www.zetaprints.com/help/list-of-web-to-print-scripts/). You need to follow certain rules of deployment to make it work.

## Folder structure ##
All scripts sit under /java/ folder.

  * **/java/** and subfolders - production
  * **/java/test/** and subfolders - testing
  * **/java/test/dev/** and subfolders - development

## Common scripts ##
These scripts have been deployed to production and should be referenced from their production location. Do not duplicate them in _test_ or _dev_.
  * **/java/jquery.min.js** - the latest jQuery in use (will be updated at some stage)
  * **/java/jquery.min.1.4.2.js** - version-specific jQuery (won't change)
  * **/java/jcrop/`*`** - jCrop plugin
  * **/java/fancybox/`*`** - fancybox plugin
  * **/java/image-edit/`*`** - images for fancybox image editing menu

## Documentation requirements ##

  1. Every script should have a wiki page (not every file, e.g. image editing has 5 files, but it's functionally one script, so one wiki page)
  1. The wiki page should have a brief description of what the script does, dependencies, high level logic as text (for very-very basic logic, like one or two sentences) or an UML diagram.
  1. The code needs to have
    * a link to the wiki page at the top
    * list of global variables with comments, if need to be modified for deployment
    * comments for logical blocks of code or functions

There is no need to duplicate the info between the code and the wiki. The wiki must be up to date, though.

# Development #
Scripts can be placed in _/java/test/dev/[issue-date]/_ folder. All dependencies should be in the same folder or subfolders. Try to package them so that it doesn't clog the production folder later on.

Do as you please while in development. Use _realestate_ for testing.

Client side caching for _/dev/_: must re-validate

# Testing #

### Informal testing ###
The script is tested from its location in _/dev/_.
  1. Change issue status to ToTest
  1. Provide clear instructions what needs to be tested
  1. Provide a list of links to the files that need to be copied into Script URL textbox on the branding page
  1. Provide a link to the release in the SVN

### Formal testing ###

Once a script is ready for formal testing it is copied by a sysadmin from _dev_ folder to a folder under _test_ with. The folder may or may not be the same.

**Requirements:**
  * clean, commented and documented code
  * clear instructions what needs to be deployed
  * a link to the release in the SVN
  * links to wiki pages for the script

Client side caching for _/test/_: 1hr


# Production #

Production scripts used in the core system are copied from their test location to _/java/_ from _/test/_ by the sysadmin once they are approved. Usually it happens after some time of being used from the test location directly.

  1. the files are copied to /java/ "as-is", with all the subfolders and satellite files
  1. the original test location remains with all the files in there
  1. the links to the scripts are published in the [list of available scripts](http://www.zetaprints.com/help/list-of-web-to-print-scripts/)

Most sites will link to this new production location. Early adopters may keep the links to the test location, so we have to maintain both.

HTTP client cache: 1 day