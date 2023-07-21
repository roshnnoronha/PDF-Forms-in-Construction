//Setting up an Email Based Approval Workflow for PDF Forms
//(c) 2023 Roshn Noronha

//On opening the form set the form state to what it was before it was last.
setFormStatus(this.getField('txt_form_status').value);

//The getFormData function retrieves the data in the form fields and save them in
//an object. Basic validation is performed on the values before returning the object.
function getFormData(){
	var ptw = {};
	//Read form data.
	ptw.number = this.getField('txt_permit_no').value;
	ptw.project = this.getField('txt_project').value;
	ptw.description = this.getField('txt_job_description').value;
	ptw.location = this.getField('txt_location').value;
	ptw.startDate = this.getField('txt_start_dd').value + '/' + this.getField('txt_start_mm').value + '/' + this.getField('txt_start_yyyy').value; 
	ptw.startTime = this.getField('txt_start_hh').value + ':' + this.getField('txt_start_min').value;
	ptw.endDate = this.getField('txt_end_dd').value + '/' + this.getField('txt_end_mm').value + '/' + this.getField('txt_end_yyyy').value;
	ptw.endTime = this.getField('txt_end_hh').value + ':' + this.getField('txt_end_min').value;
	ptw.inchargeName = this.getField('txt_incharge_name').value;
	ptw.inchargeEmail = this.getField('txt_incharge_mail').value;
	ptw.inchargeCompany = this.getField('txt_incharge_company').value;
	ptw.authName = this.getField('txt_authorize_name').value;
	ptw.authEmail = this.getField('txt_authorize_mail').value;
	ptw.authCompany = this.getField('txt_authorize_company').value;
	ptw.ccList = this.getField('txt_cc_list').value;
	ptw.inchargeSign1 = (this.getField('sig_incharge_1').signatureValidate() == 4);
	ptw.authSign1 = (this.getField('sig_authorize_1').signatureValidate() == 4);
	ptw.inchargeSign2 = (this.getField('sig_incharge_2').signatureValidate() == 4);
	ptw.authSign2 = (this.getField('sig_authorize_2').signatureValidate() == 4);
	//Validate the data.
	if (!ptw.number)
		throw 'Permit number is a required field.';
	if (!ptw.project)
		throw 'Project is a required field.';
	if (!ptw.description)
		throw 'Job description is a requried field.';
	if (!ptw.location)
		throw 'Location is a required field.';	
	if (!ptw.inchargeName)
		throw 'Name of person in charge is a required field.';
	if (!ptw.inchargeEmail)
		throw 'Email of person in charge is a required field.';
	if (!ptw.inchargeCompany)
		throw 'Company of person in charge is a required field.';	
	if (!ptw.authName)
		throw 'Name of authorizing person is a required field.';
	if (!ptw.authEmail)
		throw 'Email of authorizing person is a required field.';
	if (!ptw.authCompany)
		throw 'Company name of authorizing person is a required field.';	
	return ptw;	
}

//The resetPTW function clears all signature and returns the form to the initial state.
function resetPTW(){	
	this.resetForm(['sig_incharge_1']);
	this.resetForm(['sig_authorize_1']);
	this.resetForm(['sig_incharge_2']);
	this.resetForm(['sig_authorize_2']);
	enableFields();
	setFormStatus(0);
}

//The disableFields function is used to make all the form fields readonly.
function disableFields(){
	this.getField('txt_permit_no').readonly = true;
	this.getField('txt_project').readonly = true;
	this.getField('txt_job_description').readonly = true;
	this.getField('txt_location').readonly = true;
	this.getField('txt_start_dd').readonly = true;
	this.getField('txt_start_mm').readonly  = true;
	this.getField('txt_start_yyyy').readonly = true; 
	this.getField('txt_start_hh').readonly = true;
	this.getField('txt_start_min').readonly = true;
	this.getField('txt_end_dd').readonly = true;
	this.getField('txt_end_mm').readonly = true;
	this.getField('txt_end_yyyy').readonly = true;
	this.getField('txt_end_hh').readonly = true;
	this.getField('txt_end_min').readonly = true;
	this.getField('chk_1').readonly = true;
	this.getField('chk_2').readonly = true;
	this.getField('chk_3').readonly = true;
	this.getField('chk_4').readonly = true;
	this.getField('txt_incharge_name').readonly = true;
	this.getField('txt_incharge_mail').readonly = true;
	this.getField('txt_incharge_company').readonly = true;
	this.getField('txt_authorize_name').readonly = true;
	this.getField('txt_authorize_mail').readonly = true;
	this.getField('txt_authorize_company').readonly = true;
}

//The enableFields function is used to make all the form fields editable.
function enableFields(){
	this.getField('txt_permit_no').readonly = false;
	this.getField('txt_project').readonly = false;
	this.getField('txt_job_description').readonly = false;
	this.getField('txt_location').readonly = false;
	this.getField('txt_start_dd').readonly = false;
	this.getField('txt_start_mm').readonly  = false;
	this.getField('txt_start_yyyy').readonly = false; 
	this.getField('txt_start_hh').readonly = false;
	this.getField('txt_start_min').readonly = false;
	this.getField('txt_end_dd').readonly = false;
	this.getField('txt_end_mm').readonly = false;
	this.getField('txt_end_yyyy').readonly = false;
	this.getField('txt_end_hh').readonly = false;
	this.getField('txt_end_min').readonly = false;
	this.getField('chk_1').readonly = false;
	this.getField('chk_2').readonly = false;
	this.getField('chk_3').readonly = false;
	this.getField('chk_4').readonly = false;
	this.getField('txt_incharge_name').readonly = false;
	this.getField('txt_incharge_mail').readonly = false;
	this.getField('txt_incharge_company').readonly = false;
	this.getField('txt_authorize_name').readonly = false;
	this.getField('txt_authorize_mail').readonly = false;
	this.getField('txt_authorize_company').readonly = false;	
}

//The setFormStatus set the status of the form. The various fields of the form are 
//enabled or disabled based on the status of the form.
function setFormStatus(formStatus){
	this.getField('txt_form_status').value = formStatus;
	if (formStatus == 0){		
		//Status 0 indicates the form is not approved.
		enableFields();
		this.getField('sig_incharge_1').readonly = false;
		this.getField('sig_authorize_1').readonly = true;
		this.getField('sig_incharge_2').readonly = true;
		this.getField('sig_authorize_2').readonly = true;		
		enableButton('btn_submit_1');
		disableButton('btn_approve_1');
		disableButton('btn_reject_1');
		disableButton('btn_submit_2');
		disableButton('btn_approve_2');
		disableButton('btn_reject_2');
	}else if (formStatus == 1){
		//Status 1 indicates that form is sent for approval/rejection.
		disableFields();
		this.getField('sig_incharge_1').readonly = true;
		this.getField('sig_authorize_1').readonly = false;
		this.getField('sig_incharge_2').readonly = true;
		this.getField('sig_authorize_2').readonly = true;
		disableButton('btn_submit_1');
		enableButton('btn_approve_1');
		enableButton('btn_reject_1');
		disableButton('btn_submit_2');
		disableButton('btn_approve_2');
		disableButton('btn_reject_2');
	}else if (formStatus == 2){
		//Status 2 indicates that the form is approved.
		this.getField('sig_incharge_1').readonly = true;
		this.getField('sig_authorize_1').readonly = true;
		this.getField('sig_incharge_2').readonly = false;
		this.getField('sig_authorize_2').readonly = true;
		disableButton('btn_submit_1');
		disableButton('btn_approve_1');
		disableButton('btn_reject_1');
		enableButton('btn_submit_2');
		disableButton('btn_approve_2');
		disableButton('btn_reject_2');
	}else if (formStatus ==3){
		//Status 3 indicates that the form is sent for closure.
		this.getField('sig_incharge_1').readonly = true;
		this.getField('sig_authorize_1').readonly = true;
		this.getField('sig_incharge_2').readonly = true;
		this.getField('sig_authorize_2').readonly = false;
		disableButton('btn_submit_1');
		disableButton('btn_approve_1');
		disableButton('btn_reject_1');
		disableButton('btn_submit_2');
		enableButton('btn_approve_2');
		enableButton('btn_reject_2');
	}else if (formStatus == 4){
		//Status 4 indicates that the form is closed.	
		this.getField('sig_incharge_1').readonly = true;
		this.getField('sig_authorize_1').readonly = true;
		this.getField('sig_incharge_2').readonly = true;
		this.getField('sig_authorize_2').readonly = true;
		disableButton('btn_submit_1');
		disableButton('btn_approve_1');
		disableButton('btn_reject_1');
		disableButton('btn_submit_2');
		disableButton('btn_approve_2');
		disableButton('btn_reject_2');		
	}
	this.getField('txt_form_status').value = formStatus;	
}

//The enableButton function makes a button clickable.
function enableButton(buttonName){
	var f = this.getField(buttonName);
	f.readonly = false;
	f.textColor = color.black;
}

//The disableButton function disables a button.
function disableButton(buttonName){
	var f = this.getField(buttonName);
	f.readonly = true;
	f.textColor = color.gray;
}

//The submitForApproval function updates the status of the form and sends an email for approval.
function submitForApproval(){
	//Get data in the form fields and if the validation fails display an error message.
	var ptw = {};
	try{
		ptw = getFormData();	
	}catch (e){
		app.alert (e);
		return 0;
	}
	//Check if the form is signed by the preparer before sending.
	if (this.getField('sig_incharge_1').signatureValidate() != 4){
		app.alert ('Please sign the form first.');
		return 0;
	}
	//Confirm submission of form.
	app.alert ({
		cMsg:'Are you sure you want to submit the form?',
		nIcon:2,
		nType:2,
		cTitle:'Permit to work form'
	});
	//Change form status.
	setFormStatus(1);	
	//Generate an email with the form attached.
	ptw.message = 'A new Permit-to-Work form has been submitted for your review and approval.';
	ptw.toEmail = ptw.authEmail;
	ptw.toName = ptw.authName;
	generateEmail(ptw);
	this.closeDoc();
}

//Set the mouse up of the 'btn_submit_1' button to call the submitForApproval function.
this.getField('btn_submit_1').setAction('MouseUp', 'submitForApproval();');

//The approve function updates the status of the form to approved and returns an approval email.
function approve(){
	//Get data in the form fields and if the validation fails display an error message.
	var ptw = {};
	try{
		ptw = getFormData();	
	}catch (e){
		app.alert (e);
		return 0;
	}
	//Check if the form is signed by the approver before sending.
	if (this.getField('sig_authorize_1').signatureValidate() != 4){
		app.alert ('Please sign the form first.');
		return 0;
	}
	//Confirm approval of form.
	app.alert ({
		cMsg:'By clicking yes you agree that you have read and approve the contents of the form. Are you sure you want to proceed?',
		nIcon:2,
		nType:2,
		cTitle:'Permit to work form'
	});	
	//Change form status.	
	setFormStatus(2);
	//Generate an email with the form attached.
	ptw.message = 'The subject Permit-to-Work has been approved.';
	ptw.toEmail = ptw.inchargeEmail;
	ptw.toName = ptw.inchargeName;
	generateEmail(ptw);	
	this.closeDoc();
}

//Set the mouse up of the 'btn_approve_1' button to call the approve function.
this.getField('btn_approve_1').setAction('MouseUp', 'approve();');

//the reject function resets the status of the form and sends a rejection email.
function reject(){
	//Get data in the form fields and if the validation fails display an error message.
	var ptw = {};
	try{
		ptw = getFormData();	
	}catch (e){
		app.alert (e);
		return 0;
	}
	//Confirm rejection of form.
	app.alert ({
		cMsg:'Are you sure you want to reject this permit?',
		nIcon:2,
		nType:2,
		cTitle:'Permit to work form'
	});	
	//Reset form status	
	setFormStatus(0);
	//Generate an email with the form attached.
	ptw.message = 'The subject Permit-to-Work has been rejected.';
	ptw.toEmail = ptw.inchargeEmail;
	ptw.toName = ptw.inchargeName;
	generateEmail(ptw);	
	this.closeDoc();
}

//Set the mouse up of the 'btn_reject_1' button to call the reject function.
this.getField('btn_reject_1').setAction('MouseUp', 'reject();');


//The submitForClosure function updates the status of the form and sends an email for closure approval.
function submitForClosure(){
	//Get data in the form fields and if the validation fails display an error message.
	var ptw = {};
	try{
		ptw = getFormData();	
	}catch (e){
		app.alert (e);
		return 0;
	}
	//Check if the form is signed by the preparer before sending.
	if (this.getField('sig_incharge_2').signatureValidate() != 4){
		app.alert ('Please sign the form first.');
		return 0;
	}
	//Confirm submit of form.
	app.alert ({
		cMsg:'Are you sure you want to submit this permit for closure?',
		nIcon:2,
		nType:2,
		cTitle:'Permit to work form'
	});	
	//Change form status.	
	setFormStatus(3);
	//Generate an email with the form attached.
	ptw.message = 'The subject Permit-to-Work closure has been requested for your approval.';
	ptw.toEmail = ptw.authEmail;
	ptw.toName = ptw.authName;
	generateEmail(ptw);	
	this.closeDoc();
}

//Set the mouse up of the 'btn_submit_2' button to call the submitForClosure function.
this.getField('btn_submit_2').setAction('MouseUp', 'submitForClosure();');

//The approveClosure function updates the status of the form to closed and returns an approval email.
function approveClosure(){
	//Get data in the form fields and if the validation fails display an error message.
	var ptw = {};
	try{
		ptw = getFormData();	
	}catch (e){
		app.alert (e);
		return 0;
	}
	//Check if the form is signed by the approver before sending.
	if (this.getField('sig_authorize_2').signatureValidate() != 4){
		app.alert ('Please sign the form first.');
		return 0;
	}
	//Confirm approval.
	app.alert ({
		cMsg:'By clicking yes you agree that you have read and approve the contents of the form. Are you sure you want to proceed?',
		nIcon:2,
		nType:2,
		cTitle:'Permit to work form'
	});	
	//Change form status.		
	setFormStatus(4);
	//Generate an email with the form attached.
	ptw.message = 'The subject Permit-to-Work closure has been approved.';
	ptw.toEmail = ptw.inchargeEmail;
	ptw.toName = ptw.inchargeName;
	generateEmail(ptw);	
	this.closeDoc();
}

//Set the mouse up of the 'btn_approve_2' button to call the approveClosure function.
this.getField('btn_approve_2').setAction('MouseUp', 'approveClosure();');

//the rejectClosure function resets the status of the form and sends a rejection email.
function rejectClosure(){
	//Get data in the form fields and if the validation fails display an error message.
	var ptw = {};
	try{
		ptw = getFormData();	
	}catch (e){
		app.alert (e);
		return 0;
	}
	//Confirm rejection.
	app.alert ({
		cMsg:'Are you sure you want to reject this permit closure?',
		nIcon:2,
		nType:2,
		cTitle:'Permit to work form'
	});	
	//Change form status.			
	setFormStatus(2);
	//Generate an email with the form attached.
	ptw.message = 'The subject Permit-to-Work closure has been rejected.';
	ptw.toEmail = ptw.inchargeEmail;
	ptw.toName = ptw.inchargeName;
	generateEmail(ptw);	
	this.closeDoc();
}

//Set the mouse up of the 'btn_reject_2' button to call the rejectClosure function.
this.getField('btn_reject_2').setAction('MouseUp', 'rejectClosure();');

//The generateEmail function creates a standardized email from the details provided in the object ptw.
function generateEmail(ptw){
	var msg = '';
	msg = 'Hello ' + ptw.toName + ',';
	msg = msg + '\n\n' + ptw.message;
	msg = msg + '\n\n\tPermit No.\t:  ' + ptw.number;
	msg = msg + '\n\tDescription\t:  ' + ptw.description;
	msg = msg + '\n\tLocation\t:  ' + ptw.location;
	msg = msg + '\n\tFrom Time\t:  ' + ptw.startDate + ' ' + ptw.startTime;
	msg = msg + '\n\tTo Time \t:  ' + ptw.endDate + ' ' + ptw.endTime;
	msg = msg + '\n\nPlease open the attached form for the next step in the workflow.'
	var subject = 'Permit to work # ' + ptw.number;
	this.mailDoc({
		bUI:false,
		cTo:ptw.toEmail,
		cCC:ptw.ccList,
		cSubject:subject,
		cMsg:msg
	});
}