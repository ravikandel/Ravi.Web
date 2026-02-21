This templates override the default typescript template from the openapi-generator-cli in order to format the 
controllers and models for our custom requirements.

The main changes to templates are:

* isomorphic-fetch.ts - credentials: "same-origin" ==> credentials: "include"
* model/model.mustache - dodgy-ish cast to any for discriminator enums

Note if the codegen parameters are changes this may not generate correctly.