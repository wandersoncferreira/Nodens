module.exports = function(mongoose){
    var commentSchema = new mongoose.Schema({
        author: String,
        date: { type: Date, default: Date.now },
        content: String,
        localization: String
    });

    var pageSchema = new mongoose.Schema({
        title: String,
        author: String,
        date: { type: Date, default: Date.now },
        biography: String,
        content: String,
        related_tags: [String],
        comments: [commentSchema]
    });

    var siteSchema = new mongoose.Schema({
        company: String,
        link: String,
        pages: [pageSchema],
        date: { type: Date, default: Date.now },
        scrap_links: [String]
    });

    var userSchema = new mongoose.Schema({
        name: String,
        last_modified: { type: Date, default: Date.now },
        biography: String,
        party: String
    });

    var models = {
        Comments: mongoose.model('Comments', commentSchema),
        Page: mongoose.model('Page', pageSchema),
        Site: mongoose.model('Site', siteSchema),
        User: mongoose.model('User', userSchema)
    };

    return models;
}
