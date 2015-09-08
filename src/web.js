// Simply list all facts

module.exports = function (web) {
	var app = web.express();

	// Set up views!
	app.set('views', __dirname + '/../templates');
	app.set('view engine', 'jade');

	app.get('/', web.render(app, 'facts', function (req, next) {
		web.bot.db.schemas.factFactoid.find({}).populate('trigger').execQ().then(function (facts) {
			next({ facts : facts, admin : req.query.admin });
		}).done();
	}));

	app.get('/words', web.render(app, 'words', function (req, next) {
		web.bot.db.schemas.word.find({}).then(function (words) {
			next({ words : words, admin : req.query.admin });
		}).done();
	}));

	app.get('/remove', function (req, res) {

		if (!req.query.id) {
			web.error(res, 'Needs ID', "Don't mess around with things you don't understand.");
			return;
		}

		var id = req.query.id;
		console.log('Deleting fact:', id);

		web.bot.db.schemas.factFactoid.remove({ _id : id })
		.then(function () {
			res.redirect('/modules/facts/');
		}).done();
	});

	app.get('/remove/words', function (req, res) {

		if (!req.query.id) {
			web.error(res, 'Needs ID', "Don't mess around with things you don't understand.");
			return;
		}

		var id = req.query.id;
		console.log('Deleting word:', id);

		web.bot.db.schemas.word.remove({ _id : id })
		.then(function () {
			res.redirect('/modules/facts/words');
		}).done();
	});

	app.locals = {
		module_root : '/modules/facts'
	};

	app.use('/static', web.express.static(__dirname + '/../static/'));

	web.addModuleApp('/facts/', app, 'Facts');
};
