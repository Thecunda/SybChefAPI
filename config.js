module.exports = {
	//first create a user 'ml' with password 'user' in mongodb
	
	'ENV': 'dev',// change to 'prod' or 'dev'
	
	'databaseDev': 'mongodb://ml:user@127.0.0.1:27017/sybChefDev?authSource=admin',//adapt//
	'databaseDevName': 'sybChefDev',//adapt//

	'apiport': 3000,
	'cliport': 4200,	
	'database': 'mongodb://ml:user@127.0.0.1:27017/sybChef?authSource=admin',//adapt//
	'databaseName': 'sybChefProd',//adapt//
	
	'secret': 'Pzsk2433!;odkfnczà"32211c??;Q<script>',
};