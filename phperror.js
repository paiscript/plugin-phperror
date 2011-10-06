(function (win) {
	var PAI = win['PAI'];
	

	
	var proto = {};
	PAI.PHPError = function() {
		emit(arguments);
	};
	PAI.PHPError.fn = proto;

	
	proto.E_ERROR = 1;
	proto.E_WARNING = 2;
	proto.E_PARSE = 4;
	proto.E_NOTICE = 8;
	proto.E_CORE_ERROR = 16;
	proto.E_CORE_WARNING = 32;
	proto.E_COMPILE_ERROR = 64;
	proto.E_COMPILE_WARNING = 128;
	proto.E_USER_ERROR = 256;
	proto.E_USER_WARNING = 512;
	proto.E_USER_NOTICE = 1024;
	proto.E_STRICT = 2048;
	proto.E_RECOVERABLE_ERROR = 4096;
	proto.E_DEPRECATED = 8192;
	proto.E_USER_DEPRECATED = 16384;

	proto.init = function(args) {
		this['level'] = args[0];
		this['message'] = args[1];
		this['file'] = args[2];
		this['line'] = args[3];
	}

	proto.toString = function () {
		return 'PHP ' + this['name'] + ': ' + this['message'] + ' in ' + this['file'] + ' on line ' + this['line'];
	};
	
	/**
	 *  @var {array} args [level, message, file, line]
	**/
	function PHPError() { this['name'] = 'error'; }
	PHPWarning.prototype = proto;
	
	function PHPWarning() { this['name'] = 'warning'; }
	PHPWarning.prototype = proto;
	
	function PHPParse() { this['name'] = 'parse'; }
	PHPParse.prototype = proto;
	
	function PHPNotice() { this['name'] = 'notice'; }
	PHPNotice.prototype = proto;
	
	function PHPCoreError() { this['name'] = 'core error'; }
	PHPCoreError.prototype = proto;
	
	function PHPCoreWarning() { this['name'] = 'core warning'; }
	PHPCoreWarning.prototype = proto;
	
	function PHPCompileError() { this['name'] = 'compile error'; }
	PHPCompileError.prototype = proto;
	
	function PHPCompileWarning() { this['name'] = 'compile warning'; }
	PHPCompileWarning.prototype = proto;
	
	function PHPUserError() { this['name'] = 'user error'; }
	PHPUserError.prototype = proto;
	
	function PHPUserWarning() { this['name'] = 'user warning'; }
	PHPUserWarning.prototype = proto;
	
	function PHPUserNotice() { this['name'] = 'user notice'; }
	PHPUserNotice.prototype = proto;
	
	function PHPStrict() { this['name'] = 'strict'; }
	PHPStrict.prototype = proto;
	
	function PHPRecoverableError() { this['name'] = 'recoverable error'; }
	PHPRecoverableError.prototype = proto;
	
	function PHPDeprecated() { this['name'] = 'deprecated'; }
	PHPDeprecated.prototype = proto;
	
	function PHPUserDeprecated() { this['name'] = 'user deprecated'; }
	PHPUserDeprecated.prototype = proto;
	

	function emit(info) {
		if (win['console'] && win['console']['error']) {
			var e;
			switch (info[0]) {
			case proto.E_ERROR: e = PHPError; break;
			case proto.E_WARNING: e = PHPWarning; break;
			case proto.E_PARSE: e = PHPParse; break;
			case proto.E_NOTICE: e = PHPNotice; break;
			case proto.E_CORE_ERROR: e = PHPCoreError; break;
			case proto.E_CORE_WARNING: e = PHPCoreWarning; break;
			case proto.E_COMPILE_ERROR: e = PHPCompileError; break;
			case proto.E_COMPILE_WARNING: e = PHPCompileWarning; break;
			case proto.E_USER_ERROR: e = PHPUserError; break;
			case proto.E_USER_WARNING: e = PHPUserWarning; break;
			case proto.E_USER_NOTICE: e = PHPUserNotice; break;
			case proto.E_STRICT: e = PHPStrict; break;
			case proto.E_RECOVERABLE_ERROR: e = PHPRecoverableError; break;
			case proto.E_DEPRECATED: e = PHPDeprecated; break;
			case proto.E_USER_DEPRECATED: e = PHPUserDeprecated; break;
//			default: e = PHPError; break;
			}
			
			e = new e();
			e.init(info);
			
			win['console']['error'](e, e.toString());
		}
	}
	
	PAI('addListener', 'pageload', function(res) {
		if (res['php-errors']) {
			var i, l;
			for (i = 0, l = res['php-errors'].length; i < l; i++) {
				emit(res['php-errors'][i]);
			}
		}
	});
	
}(this));