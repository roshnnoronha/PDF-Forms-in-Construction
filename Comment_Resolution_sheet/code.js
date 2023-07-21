//Consolodating Comments Using PDF Forms and JavaScript
//(c)2023 Roshn Noronha


//The updateComment function gets all the comments in the current file
//and update the list box with the comments.
function updateComments(){
	//Get all comments using the getAnnots function
	var commentsFromFile = this.getAnnots();
	//Write comment data into a hidden text field 
	writeCommentData(commentsFromFile);
	//update the list box with the comments
	var commList = this.getField('lst_comments');
	commList.clearItems();
	for (var i = 0; i < commentsFromFile.length; i++){
		commList.insertItemAt(commentsFromFile[i].contents,i,i);
	}
	commList.value = 0;
}

//Set the mouse up of the 'Refresh Comments' button to call the updateComments function.
this.getField('btn_refresh').setAction('MouseUp','updateComments();');

//The writeCommentData function saves the list of comments into a hidden text field 
//in a delimited text format. We use '||||' and '++++' as separators.
function writeCommentData(comments){
	var csv = '';
	for (var i = 0; i < comments.length; i++){
		csv += i;
		csv += '||||' + comments[i].contents;
		csv += '||||' + comments[i].author;
		csv += '||||' + comments[i].page;
		csv += comments[i].resolution? ('||||' + comments[i].resolution): '||||';
		csv += comments[i].resolutionBy? ('||||' + comments[i].resolutionBy): '||||';
		csv += comments[i].status? ('||||' + comments[i].status): '||||open';
		if (i < comments.length - 1) csv += '++++';
	}
    //console.println(csv);
	this.getField('txt_hidden').value = csv;	
}

//The getCommentData function parses the data in the hidden text field to return the saved
//comment data.
function getCommentData(){
	var comments = [];
	var csvLines;
	var csvSplit;
	var csv = this.getField('txt_hidden').value;
	if (csv != ''){
		csvLines = csv.split('++++');
		for (var i = 0;i < csvLines.length; i++){
			var comment = {};
			csvSplit = csvLines[i].split('||||');
			comment.id = csvSplit[0];
			comment.contents = csvSplit[1];
			comment.author = csvSplit[2];
			comment.page = csvSplit[3];
			comment.resolution = csvSplit[4];
			comment.resolutionBy = csvSplit[5];
			comment.status = csvSplit[6];
			comments.push(comment);
		}
	}	
	return comments;
}

//The listSelectionChange function is called when the user selects an item from the 
//list box. Based on the selection it updates the comment details 
function listSelectionChange(commentNo){
	var comments = getCommentData();
	for (var i = 0; i < comments.length; i++){
		if (comments[i].id == commentNo){            
			this.getField('txt_comment_no').value = comments[i].id;
			this.getField('txt_page').value = comments[i].page;
			this.getField('txt_comment').value = comments[i].contents;
			this.getField('txt_comment_by').value = comments[i].author;
			this.getField('txt_resolution').value = comments[i].resolution;
			this.getField('txt_resolution_by').value = comments[i].resolutionBy;
			this.getField('txt_status').value = comments[i].status;
			i = comments.length;
		}
	}
}
//Set the Keystroke event (triggers when selection changes) of the Comments list to call the listSelectionChange 
//function with the current value.
this.getField('lst_comments').setAction('Keystroke', 'listSelectionChange(event.changeEx);');

//The updateResolution function is called when the 'Resolution' text field is updated.
//The argument newValue contains the updated value.
function updateResolution(newValue){
	var commentNo = this.getField('txt_comment_no').value;
	var comments = getCommentData();	
	for (var i = 0; i < comments.length; i++)
		if(commentNo == comments[i].id)			
			comments[i].resolution = newValue;
	writeCommentData(comments);
}

//Set the validate event of 'Resolution' field to call the updateResolution function with the current value.
this.getField('txt_resolution').setAction('Validate', 'updateResolution(event.value);');

//The updateResolutionBy function is called when the 'Resolution by' text field is updated.
//The argument newValue contains the updated value.
function updateResolutionBy(newValue){
	var commentNo = this.getField('txt_comment_no').value;
	var comments = getCommentData();	
	for (var i = 0; i < comments.length; i++)
		if(commentNo == comments[i].id)			
			comments[i].resolutionBy = newValue;
	writeCommentData(comments);
}

//Set the validate event of the 'Resolution By' field to call the updateResolutionBy function with the current value.
this.getField('txt_resolution_by').setAction('Validate', 'updateResolutionBy(event.value);');

//The updateStatus function is called when the 'Status' text field is updated.
//The argument newValue contains the updated value.
function updateStatus(newValue){
	var commentNo = this.getField('txt_comment_no').value;
	var comments = getCommentData();	
	for (var i = 0; i < comments.length; i++)
		if(commentNo == comments[i].id)		
			comments[i].status = newValue;
	writeCommentData(comments);
}

//Set the validate event of the 'Status' field to call the updateStatus function with the current value.
this.getField('txt_status').setAction('Validate','updateStatus(event.value);');

//The toggleStatuts function is called to switch the status field from 'open' to 'closed'
//and vice versa.
function toggleStatus(){
	var f = this.getField('txt_status')
	if (f.value == 'open')
		f.value = 'closed';
	else
		f.value = 'open';
}

//Set the mouse up of the Toggle status button to call the toggleStatus function.
this.getField('btn_toggle').setAction('MouseUp','toggleStatus();');

//The gotoPage function takes the user to the page on which the comment is located.
function gotoPage(){
	this.pageNum = this.getField('txt_page').value;
}
//Set the mouse up of the 'Goto page' button to call the gotoPage function.
this.getField('btn_goto').setAction('MouseUp','gotoPage();');