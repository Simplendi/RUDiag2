angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/access.html',
    "<div class=page-border><div ng-if=\"state=='loading'\">Loading test</div><div ng-if=\"state=='error'\"><h1>Error</h1><p>An unknown error occured. Please try again later.</p></div><div ng-if=\"state=='unknown'\"><h1>Error</h1><p>Cannot open test. The test is unknown, not yet opened, or closed.</p></div><div ng-if=\"state=='form'\"><h1>{{test.title}}</h1><div ng-if=\"test.invite_method=='link'\"><p>Please provide your e-mailaddress below to request a invite</p><div class=row><div class=\"col-sm-offset-3 col-sm-6\"><input type=email class=form-control id=email placeholder=\"Enter e-mail\" ng-model=inviteData.email> <button type=submit class=\"btn btn-default\" ng-click=requestInvite()>Request invite</button></div></div></div><div ng-if=\"test.invite_method=='code' || test.invite_method=='secure'\"><p>Please provide the access code you received</p><div class=row><div class=\"col-sm-offset-3 col-sm-6\" ng-class=\"{'has-error':codeError}\"><input class=form-control id=code placeholder=code ng-model=inviteData.code> <button type=submit class=\"btn btn-default\" ng-click=openTest()>Open test</button> <span ng-if=codeError class=help-block>Unknown access-code</span></div></div></div></div><div ng-if=\"state=='done'\"><h1>{{test.title}}</h1><div>An e-mail with an invite was sent to the provided e-mailaddress.</div></div></div>"
  );


  $templateCache.put('views/feedback.html',
    "<div class=row><div class=\"page-border col-xs-12\" ng-if=\"state=='loading'\">Loading</div><div class=\"page-border col-xs-12\" ng-if=\"state=='feedback'\"><h1>{{test.title}}</h1><div ng-repeat=\"content in test.content\"><div ng-if=\"content.type=='text'\" contentable class=contentable ng-model=content.data></div><div ng-if=\"content.type=='question'\"><h3>Question {{contentToQuestionIndex($index)+1}}</h3><choice-question ng-if=\"content.data.type=='choice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></choice-question><multiplechoice-question ng-if=\"content.data.type=='multiplechoice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></multiplechoice-question><open-question ng-if=\"content.data.type=='open'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></open-question></div></div></div></div>"
  );


  $templateCache.put('views/home.html',
    "<div class=page-border><h1>RUDiag</h1><p>This is the RUDiag server. You probably wanted to visit a test. Please ask for the specific URL to the test.</p></div>"
  );


  $templateCache.put('views/test.html',
    "<div class=row><div class=\"page-border col-xs-12\" ng-if=\"state=='loading'\">Loading</div><div class=\"page-border col-xs-12\" ng-if=\"state=='error'\"><h2 class=test-heading>Error</h2>An error occurred, the test could not be loaded. This could mean that the test is closed and the feedback can not be accessed or the access-code was wrong.</div><div class=\"page-border col-xs-12\" ng-if=\"state=='data'\"><p>Please complete the following data to start the test.</p><form class=form-horizontal><div class=form-group><label for=name class=\"col-sm-2 control-label\">Name</label><div class=col-sm-10><input class=form-control id=name placeholder=\"Lastname, Prefix, Firstname\" ng-model=testSession.name></div><label for=student_id class=\"col-sm-2 control-label\">Student-ID</label><div class=col-sm-10><input class=form-control id=student_id placeholder=3123456 ng-model=testSession.student_id></div><label for=email class=\"col-sm-2 control-label\">Email</label><div class=col-sm-10><input class=form-control id=email placeholder=yourname@example.org ng-model=testSession.email></div><div ng-if=test.extra_data_label><label for=extra_data class=\"col-sm-2 control-label\">{{test.extra_data_label}}</label><div class=col-sm-10><select class=form-control id=extra_data ng-model=testSession.extra_data><option ng-repeat=\"option in test.extra_data_options track by $index\" ng-selected=\"testSession.extra_data==option\">{{option}}</option></select></div></div><div class=\"col-sm-offset-2 col-sm-10\"><a href=\"\" class=\"btn btn-default\" ng-click=dataDone()>Done</a></div></div></form></div><div class=\"page-border col-xs-8\" ng-if=\"state=='answer'\"><test test=test ng-if=\"test.type=='basic'\" test-session=testSession></test><div ng-if=\"test.type=='tree'\"><h2 class=test-heading>{{openElement.title}}</h2><div contentable class=contentable ng-if=\"openElement.type=='text'\" ng-model=openElement.data></div><div ng-if=\"openElement.type=='question'\"><choice-question ng-if=\"openElement.data.type=='choice'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=\"openElement.maxAnswers && getPreviousAnswers().length>=openElement.maxAnswers\"></choice-question><multiplechoice-question ng-if=\"openElement.data.type=='multiplechoice'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=\"openElement.maxAnswers && getPreviousAnswers().length>=openElement.maxAnswers\"></multiplechoice-question><open-question ng-if=\"openElement.data.type=='open'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=\"openElement.maxAnswers && getPreviousAnswers().length>=openElement.maxAnswers\"></open-question><text-question ng-if=\"openElement.data.type=='text'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=\"openElement.maxAnswers && getPreviousAnswers().length>=openElement.maxAnswers\"></text-question><a ng-disabled=\"((openAnswer.answer==undefined)||(openElement.data.type!='choice'&&openAnswer.answer.length==0))\" ng-if=\"!openElement.maxAnswers || (openElement.maxAnswers && getPreviousAnswers().length<openElement.maxAnswers)\" href=\"\" ng-click=answerQuestion() class=\"btn btn-success\">Answer</a></div><div ng-if=\"openElement && openElement.type!='route'\" ng-repeat=\"child in openElement.children track by $index\"><a href=\"\" ng-click=\"openElementByPath(openPath + '.' + ($index+1).toString() + '.1')\"><span contentable class=contentable ng-model=openElement.child_labels[$index]></span></a></div><div ng-if=\"openElement.type=='route'\"><choice-question data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=\"openElement.maxAnswers && getPreviousAnswers().length>=openElement.maxAnswers\"></choice-question><a ng-if=\"!openElement.maxAnswers || (openElement.maxAnswers && getPreviousAnswers().length<openElement.maxAnswers)\" href=\"\" ng-disabled=!hasAnswerElement() ng-click=openAnswerElement() class=\"btn btn-success\">Answer</a></div><div ng-if=\"(!openElement.minAnswers && !openElement.hideNext) || (openElement.minAnswers && getPreviousAnswers().length>=openElement.minAnswers)\" class=tree-test-next-buttons><a href=\"\" class=\"btn btn-primary\" ng-if=hasNextElement() ng-click=preventUnanswered(openNextElement)>Next</a> <a href=\"\" class=\"btn btn-primary\" ng-if=!hasNextElement()&&hasUpElement() ng-click=preventUnanswered(openUpElement)>Up</a></div></div></div><div class=\"page-border col-xs-12\" ng-if=\"state=='done'\"><h1 class=test-heading>{{test.title}}</h1>Your answers are submitted successfully. <span ng-if=\"test.feedback_timing=='at'\">You can see your results at {{test.feedback_at | timeFormat }} by visiting this page again.</span> <span ng-if=\"test.feedback_timing=='after'\">Your results will be available <span ng-if=\"test.feedback_after && test.feedback_after < 15\">soon</span> <span ng-if=\"test.feedback_after >= 15\">after {{test.feedback_after}} minutes</span> by visting this page again.</span></div><div class=\"page-border col-xs-12\" ng-if=\"state=='feedback'&&test.type=='basic'\"><test-feedback test=test test-session=testSession></test-feedback></div><div class=\"page-border col-xs-8\" ng-if=\"state=='feedback'&&test.type=='tree'\"><h2 class=test-heading>{{openElement.title}}</h2><div contentable class=contentable ng-if=\"openElement.type=='text'\" ng-model=openElement.data></div><div ng-if=\"openElement.type=='question'\"><choice-question ng-if=\"openElement.data.type=='choice'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=true></choice-question><multiplechoice-question ng-if=\"openElement.data.type=='multiplechoice'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=true></multiplechoice-question><open-question ng-if=\"openElement.data.type=='open'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=true></open-question><text-question ng-if=\"openElement.data.type=='text'\" data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=true></text-question></div><div ng-if=\"openElement.type=='route'\"><choice-question data=openElement.data answer=openAnswer.answer previous-answers=getPreviousAnswers() ng-disabled=true></choice-question></div></div><div ng-if=\"state=='answer'||(state=='feedback'&&test.type=='tree')\" class=col-xs-4><div class=page-border>Email: {{testSession.email}}<br>Name: {{testSession.name}}<br>Student-ID: {{testSession.student_id}}<br><br><div ng-if=\"state=='answer'\">Last auto-saved <span second-difference ng-model=testSession.updated_at scale=minutes></span> minutes ago<br><a href=\"\" ng-click=submit() class=\"btn btn-default\">Submit answers</a></div><div ng-if=\"state=='feedback'&&test.type=='tree'\"><a href=/run/test_session/{{testSession.id}}/answers target=_blank>Printable answers</a></div><div class=test-tree-container><tree-test-tree ng-if=\"test.type=='tree'\" content=test.content test-session=testSession path=\"\" open-element-handler=openElementHandler is-element-open=isElementOpen is-element-visited=isElementVisited></tree-test-tree></div></div></div></div>"
  );


  $templateCache.put('views/test_next.html',
    "<div class=modal-header><h3>Unanswered</h3></div><div class=modal-body>You have entered an answer but didn't click the answer button. Are you sure you want to continue.</div><div class=modal-footer><a class=\"btn btn-primary\" ng-click=ok()>Continue</a> <a class=\"btn btn-default\" ng-click=cancel()>Back</a></div>"
  );


  $templateCache.put('views/test_submit.html',
    "<div class=modal-header><h3>Submit answers</h3></div><div class=modal-body>Are you sure you want to submit the answers? All answers are final after submitting.</div><div class=modal-footer><a class=\"btn btn-default\" ng-click=ok()>Submit answers</a> <a class=\"btn btn-default\" ng-click=cancel()>Cancel</a></div>"
  );


  $templateCache.put('views/directives/choice_question.html',
    "<div contentable class=contentable ng-model=data.content.question_before></div><span class=question-option ng-repeat=\"choice in data.content.choices track by $index\" ng-if=\"!(disabled&&previousAnswers&&previousAnswers.length>0)\"><img src=/static/img/16x16.png ng-if=\"showResult&&(!answerIsRight()&&data.answers[0]!=$index||answerIsRight())\"> <img src=/static/img/tick.png ng-if=\"showResult&&!answerIsRight()&&data.answers[0]==$index\"> <img src=/static/img/16x16.png ng-if=\"showResult&&answer!=$index\"> <img src=/static/img/tick.png ng-if=\"showResult&&answerIsRight()&&answer==$index\"> <img src=/static/img/cross.png ng-if=\"showResult&&!answerIsRight()&&answer==$index\"> <input ng-if=showResult type=radio disabled ng-checked=\"answer==$index\"> <input ng-if=!showResult type=radio ng-disabled=disabled||shouldBlockAnswer($index) ng-model=$parent.$parent.$parent.answer ng-value=\"$index\"><div contentable class=\"question-option-content contentable\" ng-model=data.content.choices[$index]></div></span><div ng-repeat=\"previousAnswer in previousAnswers | reverse track by $index\" class=previous-answer><span class=question-option ng-repeat=\"choice in data.content.choices track by $index\"><input type=radio disabled ng-checked=\"previousAnswer==$index\"><div contentable class=\"question-option-content contentable\" ng-model=data.content.choices[$index]></div></span><div ng-if=\"data.answers.length > 0\"><h6>Feedback</h6><div contentable ng-if=\"data.answers.indexOf(previousAnswer) >= 0\" ng-model=\"data.feedback['right']\"></div><div contentable ng-if=\"data.answers.indexOf(previousAnswer) < 0\" ng-model=\"data.feedback['wrong']\"></div></div></div><div contentable class=contentable ng-model=data.content.question_after></div>"
  );


  $templateCache.put('views/directives/multiplechoice_question.html',
    "<div contentable class=contentable ng-model=data.content.question_before></div><span class=question-option ng-repeat=\"choice in data.content.choices track by $index\" ng-if=\"!(disabled&&previousAnswers&&previousAnswers.length>0)\"><img src=/admin/static/img/16x16.png ng-if=\"showResult&&answerIsRight()\"> <img src=/admin/static/img/tick.png ng-if=\"showResult&&answerIsRight()&&answer.indexOf($index)>=0\"> <img src=/admin/static/img/16x16.png ng-if=\"showResult&&answerIsRight()&&answer.indexOf($index)<0\"> <img src=/admin/static/img/tick.png ng-if=\"showResult&&!answerIsRight()&&data.answers[0].indexOf($index) >= 0\"> <img src=/admin/static/img/16x16.png ng-if=\"showResult&&!answerIsRight()&&data.answers[0].indexOf($index) < 0\"> <img src=/admin/static/img/cross.png ng-if=\"showResult&&!answerIsRight()&&answer.indexOf($index) >= 0\"> <img src=/admin/static/img/16x16.png ng-if=\"showResult&&!answerIsRight()&&answer.indexOf($index) < 0\"> <input ng-if=showResult type=checkbox disabled ng-checked=\"answer.indexOf($index) >= 0\"> <input ng-if=!showResult type=checkbox ng-disabled=disabled ng-click=toggleAnswerOption($index) ng-checked=\"$parent.$parent.answer.indexOf($index) >= 0\"><div contentable class=\"question-option-content contentable\" ng-model=data.content.choices[$index]></div></span><div ng-repeat=\"previousAnswer in previousAnswers | reverse track by $index\" class=previous-answer><span class=question-option ng-repeat=\"choice in data.content.choices track by $index\"><input type=checkbox disabled ng-checked=\"previousAnswer.indexOf($index) >= 0\"><div contentable class=\"question-option-content contentable\" ng-model=data.content.choices[$index]></div></span><div ng-if=\"data.answers.length > 0\"><h6>Feedback</h6><div contentable ng-if=isAnswerRight(previousAnswer) ng-model=\"data.feedback['right']\"></div><div contentable ng-if=!isAnswerRight(previousAnswer) ng-model=\"data.feedback['wrong']\"></div></div></div><div contentable class=contentable ng-model=data.content.question_after></div>"
  );


  $templateCache.put('views/directives/open_question.html',
    "<div contentable class=contentable ng-model=data.content.question_before ng-disabled=disabled></div><input class=form-control ng-model=$parent.answer ng-disabled=disabled ng-if=\"!(disabled&&previousAnswers&&previousAnswers.length>0)\"><div ng-repeat=\"previousAnswer in previousAnswers | reverse track by $index\"><input class=form-control ng-model=previousAnswer disabled><div ng-if=\"data.answers.length > 0\"><h6>Feedback</h6><div contentable ng-if=\"data.answers.indexOf(previousAnswer) >= 0\" ng-model=\"data.feedback['right']\"></div><div contentable ng-if=\"data.answers.indexOf(previousAnswer) < 0\" ng-model=\"data.feedback['wrong']\"></div></div></div><div contentable class=contentable ng-model=data.content.question_after ng-disabled=disabled></div>"
  );


  $templateCache.put('views/directives/test.html',
    "<div><h1 class=test-heading>{{test.title}}</h1><div ng-repeat=\"content in test.content\"><div ng-if=\"content.type=='text'\" contentable class=contentable ng-model=content.data></div><div ng-if=\"content.type=='question'\"><h3>Question {{contentToQuestionIndex($index)+1}}</h3><choice-question ng-if=\"content.data.type=='choice'\" data=content.data answer=testSession.answers[contentToQuestionIndex($index)] ng-disabled=disabled></choice-question><multiplechoice-question ng-if=\"content.data.type=='multiplechoice'\" data=content.data answer=testSession.answers[contentToQuestionIndex($index)] ng-disabled=disabled></multiplechoice-question><open-question ng-if=\"content.data.type=='open'\" data=content.data answer=testSession.answers[contentToQuestionIndex($index)] ng-disabled=disabled></open-question><text-question ng-if=\"content.data.type=='text'\" data=content.data answer=testSession.answers[contentToQuestionIndex($index)] ng-disabled=disabled></text-question></div></div></div>"
  );


  $templateCache.put('views/directives/test_feedback.html',
    "<div><h1>{{test.title}}</h1><h2>Question feedback</h2><div ng-repeat=\"content in test.content | filter: {'type':'question'}\"><h3>Question {{$index+1}}</h3><choice-question ng-if=\"content.data.type=='choice'\" data=content.data answer=testSession.answers[$index] show-result=true></choice-question><multiplechoice-question ng-if=\"content.data.type=='multiplechoice'\" data=content.data answer=testSession.answers[$index] show-result=true></multiplechoice-question><open-question ng-if=\"content.data.type=='open'\" data=content.data answer=testSession.answers[$index] show-result=true></open-question><text-question ng-if=\" content.data.type=='text'\" data=content.data answer=testSession.answers[$index] show-result=true></text-question><h4>Feedback</h4><div contentable class=contentable ng-model=\"testSession['question_feedback'][$index]['feedback']\"></div></div><h2>Total feedback</h2><div contentable class=contentable ng-model=testSession.total_feedback></div></div>"
  );


  $templateCache.put('views/directives/text_question.html',
    "<div contentable class=contentable ng-model=data.content.question_before ng-disabled=disabled></div><textarea class=form-control rows=10 ng-model=$parent.answer ng-disabled=disabled ng-if=\"!(disabled&&previousAnswers&&previousAnswers.length>0)\"></textarea><div ng-repeat=\"previousAnswer in previousAnswers | reverse track by $index\"><textarea class=form-control rows=10 disabled>\n" +
    "{{previousAnswer}}\n" +
    "</textarea><div ng-if=\"data.answers.length > 0\"><h6>Feedback</h6><div contentable ng-if=\"data.answers.indexOf(previousAnswer) >= 0\" ng-model=\"data.feedback['right']\"></div><div contentable ng-if=\"data.answers.indexOf(previousAnswer) < 0\" ng-model=\"data.feedback['wrong']\"></div></div></div><div contentable class=contentable ng-model=data.content.question_after ng-disabled=disabled></div>"
  );


  $templateCache.put('views/directives/tree_test_tree.html',
    "<ul class=test-tree><li ng-repeat=\"element in content\" class=test-tree-element ng-show=\"isElementVisited()((path || '') + ($index+1).toString())\"><span class=test-tree-simple-element ng-if=isElementOpen()(element)><b><a href=\"\" ng-click=\"openElementHandler()(element, path + ($index+1).toString())\">{{path}}{{$index+1}} {{element.title}}</a></b></span> <span class=test-tree-simple-element ng-if=!isElementOpen()(element)><a href=\"\" ng-click=\"openElementHandler()(element, path + ($index+1).toString())\">{{path}}{{$index+1}} {{element.title}}</a></span><ul ng-if=\"element.children.length>0 && element.type!='route'\" class=test-tree-options><li class=test-tree-option ng-repeat=\"child in element.children track by $index\" ng-show=\"isElementVisited()(getPath(element) + ($index+1) + '.1')\">{{element.child_labels[$index]}}<tree-test-tree content=element.children[$index] path=\"getPath(element) + ($index+1) + '.'\" is-element-visited=isElementVisited() open-element-handler=openElementHandler() is-element-open=isElementOpen()></tree-test-tree></li></ul><ul ng-if=\"element.type=='route'\" class=test-tree-options><li class=test-tree-option ng-repeat=\"option in element.data.content.choices track by $index\" ng-show=\"isElementVisited()(getPath(element) + ($index+1) + '.1')\">Answer {{$index+1}}<tree-test-tree content=element.children[$index] path=\"getPath(element) + ($index+1) + '.'\" is-element-visited=isElementVisited() open-element-handler=openElementHandler() is-element-open=isElementOpen()></tree-test-tree></li></ul></li></ul>"
  );

}]);
