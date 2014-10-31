import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    
	this.$(".dial").attr('data-min', '0')
      .attr('data-max', '10')
      .attr('data-step', '1')
      .attr('data-angleOffset', '-125')
      .attr('data-angleArc', '250')
      .attr('data-width', '150')
      .attr('data-height', '150')
      .knob();

	this.$("#vol").click(function(){
		if ($("#vol").attr("class") == "fa fa-volume-up fa-2x"){
			$("#vol").removeClass("fa fa-volume-up fa-2x").addClass("fa fa-volume-off fa-2x");
			$('.dial').val(0).trigger('change');
			$('#status').text('Enable');
		}
		else{
			$("#vol").removeClass("fa fa-volume-off fa-2x").addClass("fa fa-volume-up fa-2x");
			$(".dial").attr('data-max', '10');
			$('.dial').val(7).trigger('change');		
			$('#status').text('Disable');			
		}
	});

  }

});
