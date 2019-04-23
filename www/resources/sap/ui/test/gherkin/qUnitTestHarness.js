﻿/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(!window.QUnit){jQuery.sap.require("sap.ui.thirdparty.qunit");}sap.ui.define(['jquery.sap.global','sap/ui/base/Object',"sap/ui/test/gherkin/GherkinTestGenerator","sap/ui/test/gherkin/StepDefinitions","sap/ui/qunit/qunit-css","sap/ui/qunit/qunit-junit","sap/ui/qunit/qunit-coverage"],function($,U,G){'use strict';var q={test:function(a){if($.type(a)!=="object"){throw new Error("qUnitTestHarness.test: input all arguments via a single object");}if($.type(a.featurePath)!=="string"){throw new Error("qUnitTestHarness.test: parameter 'featurePath' must be a valid string");}if(($.type(a.steps)!=="function")||!((new a.steps())._generateTestStep)){throw new Error("qUnitTestHarness.test: parameter 'steps' must be a valid StepDefinitions constructor");}var t=new G(a.featurePath,a.steps);var f=t.generate();QUnit.module(f.name,{beforeEach:function(){t.setUp();},afterEach:function(){t.tearDown();}});$.sap.log.info("[GHERKIN] Running feature: '"+f.name+"'");f.testScenarios.forEach(function(T){var b=(!f.skip&&!T.skip)?QUnit.test:QUnit.skip;b(T.name,function(c){$.sap.log.info("[GHERKIN] Running scenario: '"+T.name+"'");T.testSteps.forEach(function(o){$.sap.log.info("[GHERKIN] Running step: text='"+o.text+"' regex='"+o.regex+"'");c.ok(o.isMatch,o.text);if(o.isMatch){QUnit.config.current.assertions.pop();}t.execute(o,c);});});});}};return q;},true);
