var Sequelize =  require('sequelize');
module.exports= {
	getModel:function(sequelize){
		var cdr = sequelize.define('cdr', {
		  id: { type: Sequelize.INTEGER, autoIncrement: true , primaryKey: true},
		  data: {
		    type: Sequelize.STRING
		  }
		});
		return cdr;
	}
}

