module.exports = (schema, options) => {
    
    let defaultOptions = {
        ignore : [],
        prefix: '_'
    }
    
    // merge options
    options = Object.assign(defaultOptions, options);
    
    
    options.ignore.push('_id');

    const transform = (doc, json) => {
        for (let path in json) {
            
            // check if path starts with prefix and not in ignore list
            if (path.startsWith(options.prefix) && !options.ignore.includes(path)) {
                
                delete json[path];
            }
        }
    }

    schema.options.toObject = schema.options.toObject || {};
    schema.options.toJSON = schema.options.toJSON || {};
    
    schema.options.toObject.transform = transform;
    schema.options.toJSON.transform = transform;
};
