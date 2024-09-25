// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
/** @type {import("c3ide2-types").Plugin} */
const Config = {
    addonType: "plugin",
    id: "mikal_effekseer",
    name: "effekseer",
    version: "1.1.0",
    category: "3d",
    // "data-and-storage",
    // "form-controls",
    // "input",
    // "media",
    // "monetisation",
    // "platform-specific",
    // "web",
    // "other"
    author: "Mikal",
    website: "https://www.construct.net",
    documentation: "https://www.construct.net",
    description: "Description",
    // addonUrl: "https://www.construct.net/en/make-games/addons/####/XXXX", // displayed in auto-generated docs
    // githubUrl: "https://github.com/skymen/XXXX", // displays latest release version in auto-generated docs
    // icon: "icon.svg", // defaults to "icon.svg" if omitted
    type: "world", // world, object, dom
    domSideScripts: [
        // "domSide.js", // no need to include "c3runtime/" prefix
    ],
    /* extensionScript: {
    enabled: false, // set to false to disable the extension script
    watch: false, // set to true to enable live reload on changes during development
    targets: [
      "x86",
      "x64",
      // "ARM64", // Disabled for now because the provided base project doesn't support it
    ],

    // you don't need to change this, the build step will rename the dll for you. Only change this if you change the name of the dll exported by Visual Studio
    name: "MyExtension",
  }, */
    fileDependencies: [
        {
            filename: "effekseer.js", // no need to include "c3runtime/" prefix
            type: "external-runtime-script",
        },
        {
            filename: "effekseer.wasm", // no need to include "c3runtime/" prefix
            type: "copy-to-output",
            fileType: "application/wasm",
        },
    ],
    info: {
        // world only
        defaultImageUrl: null,
        Set: {
            // world only
            IsResizable: false,
            IsRotatable: false,
            Is3D: true,
            HasImage: true,
            IsTiled: false,
            SupportsZElevation: true,
            SupportsColor: false,
            SupportsEffects: false,
            MustPreDraw: false,

            // object only
            IsSingleGlobal: false,

            // world and object
            CanBeBundled: false,
            IsDeprecated: false,
            GooglePlayServicesEnabled: false,
        },
        AddCommonACEs: {
            // world only
            Position: true,
            SceneGraph: true,
            Size: false,
            Angle: false,
            Appearance: false,
            ZOrder: true,
        },
    },
    properties: [
        {
            type: "integer",
            id: "scaleX",
            name: "Scale X",
            desc: "The scale of the effect on the X axis",
            options: {
                initialValue: 1,
            },
        },
        {
            type: "integer",
            id: "scaleY",
            name: "Scale Y",
            desc: "The scale of the effect on the Y axis",
            options: {
                initialValue: 1,
            },
        },
        {
            type: "integer",
            id: "scaleZ",
            name: "Scale Z",
            desc: "The scale of the effect on the Z axis",
            options: {
                initialValue: 1,
            },
        },
        {
            type: "float",
            id: "rotationX",
            name: "Rotation X",
            desc: "The rotation of the effect on the X axis",
            options: {
                initialValue: 0,
            },
        },
        {
            type: "float",
            id: "rotationY",
            name: "Rotation Y",
            desc: "The rotation of the effect on the Y axis",
            options: {
                initialValue: 0,
            },
        },
        {
            type: "float",
            id: "rotationZ",
            name: "Rotation Z",
            desc: "The rotation of the effect on the Z axis",
            options: {
                initialValue: 0,
            },
        },
        /*
    {
      type:
        "integer"
        "float"
        "percent"
        "text"
        "longtext"
        "check"
        "font"
        "combo"
        "color"
        "object"
        "group"
        "link"
        "info"

      id: "property_id",
      options: {
        initialValue: 0,
        interpolatable: false,

        // minValue: 0, // omit to disable
        // maxValue: 100, // omit to disable

        // for type combo only
        // items: [
        //   {itemId1: "item name1" },
        //   {itemId2: "item name2" },
        // ],

        // dragSpeedMultiplier: 1, // omit to disable

        // for type object only
        // allowedPluginIds: ["Sprite", "<world>"],

        // for type link only
        // linkCallback: `function(instOrObj) {}`,
        // linkText: "Link Text",
        // callbackType:
        //   "for-each-instance"
        //   "once-for-type"

        // for type info only
        // infoCallback: `function(inst) {}`,
      },
      name: "Property Name",
      desc: "Property Description",
    }
    */
    ],
    aceCategories: {
        // follows the format id: langName
        // in the ACEs refer to categories using the id, not the name
        effect: "Effect",
    },
    Acts: {
        SetScale: {
            category: "effect",
            forward: "_SetScale",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [
                {
                    id: "scaleX",
                    name: "Scale X",
                    desc: "The scale of the effect on the X axis",
                    type: "number",
                    initialValue: 1,
                },
                {
                    id: "scaleY",
                    name: "Scale Y",
                    desc: "The scale of the effect on the Y axis",
                    type: "number",
                    initialValue: 1,
                },
                {
                    id: "scaleZ",
                    name: "Scale Z",
                    desc: "The scale of the effect on the Z axis",
                    type: "number",
                    initialValue: 1,
                },
            ],
            listName: "Set Scale",
            displayText: "Set Scale [i]{0}[/i], [b]{1}[/b], [b]{2}[/b]",
            description: "Sets the scale of the effect",
        },
        SetFrame: {
            category: "effect",
            forward: "_SetFrame",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [
                {
                    id: "frame",
                    name: "Frame",
                    desc: "The frame to set the effect to",
                    type: "number",
                    initialValue: 0,
                },
            ],
            listName: "Set Frame",
            displayText: "Set Frame [i]{0}[/i]",
            description: "Sets the frame of the effect",
        },
        Stop: {
            category: "effect",
            forward: "_Stop",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [],
            listName: "Stop effect",
            displayText: "Stop effect",
            description: "Stops the effect",
        },
        /*
    SampleAction: {
      // The category of the action as it appears in the add action dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this action
      // Cases where you might not want this are:
      // 1- If the action params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the action in the add action dialog
      highlight: true,

      // Set to true to hide the action in the interface. False by default if not specified.
      deprecated: false,

      // Marks the action as async. Defaults to false if not specified.
      isAsync: false,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          initialValue: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the action as it appears in the add action dialog
      listName: "Sample Action",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      displayText: "Sample action [i]{0}[/i]",

      // The description of the action as it appears in the add action dialog
      description: "This is a sample action",
    },
    */
        LoadEffect: {
            category: "effect",
            forward: "_LoadEffect",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [
                {
                    id: "effectPath",
                    name: "Effect path",
                    desc: "The path of the effect to load",
                    type: "string",
                    initialValue: "",
                },
                {
                    id: "name",
                    name: "Name",
                    desc: "The name of the effect",
                    type: "string",
                    initialValue: "",
                },
                {
                    id: "autoPlay",
                    name: "Auto play",
                    desc: "Whether to play the effect after loading",
                    type: "boolean",
                    initialValue: "true",
                },
            ],
            listName: "Load Effect",
            displayText:
                "Load Effect [i]{0}[/i], [b]{1}[/b] auto play: [b]{2}[/b]",
            description: "Loads an effect from the specified path",
        },
        Play: {
            category: "effect",
            forward: "_Play",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [],
            listName: "Play effect",
            displayText: "Play effect",
            description: "Plays the effect",
        },

        SetRotation: {
            category: "effect",
            forward: "_SetRotation",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [
                {
                    id: "rotationX",
                    name: "Rotation X",
                    desc: "The rotation of the effect on the X axis",
                    type: "number",
                    initialValue: 0,
                },
                {
                    id: "rotationY",
                    name: "Rotation Y",
                    desc: "The rotation of the effect on the Y axis",
                    type: "number",
                    initialValue: 0,
                },
                {
                    id: "rotationZ",
                    name: "Rotation Z",
                    desc: "The rotation of the effect on the Z axis",
                    type: "number",
                    initialValue: 0,
                },
            ],
            description: "Sets the rotation of the effect",
            listName: "Set Rotation",
            displayText: "Set Rotation [i]{0}[/i], [b]{1}[/b], [b]{2}[/b]",
        },
    },
    Cnds: {
        OnLoaded: {
            category: "effect",
            isTrigger: true,
            forward: "_OnLoaded",
            isFakeTrigger: false,
            isStatic: false,
            isLooping: false,
            isInvertible: false,
            isCompatibleWithTriggers: false,
            autoScriptInterface: true,
            highlight: false,
            deprecated: false,
            params: [],
            listName: "On Loaded",
            displayText: "On Loaded",
            description: "Called when the effect is loaded",
        },
        IsLoaded: {
            category: "effect",
            forward: "_IsLoaded",
            isTrigger: false,
            isFakeTrigger: false,
            isStatic: false,
            isLooping: false,
            isInvertible: false,
            isCompatibleWithTriggers: false,
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [],
            listName: "Is Loaded",
            displayText: "Is Loaded",
            description: "Checks if the effect is loaded",
        },
        OnFinished: {
            category: "effect",
            isTrigger: true,
            isFakeTrigger: false,
            isStatic: false,
            isLooping: false,
            isInvertible: false,
            isCompatibleWithTriggers: true,
            forward: "_OnFinished",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [],
            listName: "On finished",
            displayText: "On Finished",
            description: "Called when the effect is finished",
        },
        /*
    SampleCondition: {
      // The category of the action as it appears in the add condition dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this condition
      // Cases where you might not want this are:
      // 1- If the condition params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the condition in the add condition dialog
      highlight: true,

      // Set to true to hide the condition in the interface. False by default if not specified.
      deprecated: false,

      // special conditions properties. These can all be omitted, and they will default to the following values:
      isTrigger: false,
      isFakeTrigger: false,
      isStatic: false,
      isLooping: false,
      isInvertible: true,
      isCompatibleWithTriggers: true,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          initialValue: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the condition as it appears in the add condition dialog
      listName: "Sample Condition",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      displayText: "Sample condition [i]{0}[/i]",

      // The description of the condition as it appears in the add condition dialog
      description: "This is a sample condition",
    },
    */
    },
    Exps: {
        Name: {
            category: "effect",
            forward: "_Name",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [],
            listName: "Name",
            displayText: "Name",
            description: "Gets the name of the effect",
            returnType: "string",
        },
        Path: {
            category: "effect",
            forward: "_Path",
            autoScriptInterface: true,
            highlight: true,
            deprecated: false,
            params: [],
            listName: "Path",
            displayText: "Path",
            description: "Gets the path of the effect",
            returnType: "string",
        },
        /*
    SampleExpression: {
      // The category of the action as it appears in the expression picker
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this expression
      // Cases where you might not want this are:
      // 1- If you don't want it to appear in the script interface
      // 2- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the expression in the expression picker
      highlight: true,

      // Set to true to hide the expression in the interface. False by default if not specified.
      deprecated: false,

      // The type of the expression.
      returnType:
        - "string"
        - "number"
        - "any" // must be either string or number

      // Set to true if the expression is variadic. False by default if not specified.
      isVariadicParameters: false

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
        },
      ],

      // The description of the expression as it appears in the expression picker
      description: "This is a sample expression",
    },
    */
    },
};

module.exports = Config;
