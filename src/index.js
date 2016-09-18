
var pxRegExp = /\b(\d+(\.\d+)?)px\b/;
var dpxRegExp = /\b(\d+(\.\d+)?)dpx\b/;
var rpxRegExp = /\b(\d+(\.\d+)?)rpx\b/;

export default function ({ types: t }) {
    return {
        visitor: {
            ObjectProperty: {
                exit({ node }) {
                    var valNode = node.value;
                    var keyNode = node.key;
                    var isAllow = /^padding|^margin|^background|^width|maxWidth|minWidth|maxHeight|minHeight|^height|lineHeight|fontSize|^border|^top|^left|^right|^bottom/i.test(keyNode.name || keyNode.value);
                    var val = valNode.value;
                    if (valNode.type === 'StringLiteral' && isAllow) {
                        if(pxRegExp.test(val)){
                            valNode.value = val.replace(/(\d+)px/g, function (px) {
                                var num = parseFloat(RegExp.$1);
                                return num * 2 / 75 + 'rem';
                            });
                        }else if(rpxRegExp.test(val)){
                            valNode.value = val.replace(/(\d+)rpx/g, function (px) {
                                var num = parseFloat(RegExp.$1);
                                return num;
                            });
                        }else if(dpxRegExp.test(val)){
                            var num = val.replace(/(\d+)dpx/g, function (px) {
                                return parseFloat(RegExp.$1);
                            });
                            node.value =  t.callExpression(
                                t.identifier('generateThreeDprPx'),
                                [t.numericLiteral(parseFloat(num))]

                            );
                        }
                    }
                }
            },

            CallExpression: function (path) {
                var scope = path.get("callee");
                if (scope.node.name === "_px2rem") {
                    var arg1 = scope.container.arguments[0];
                    var val = parseFloat(arg1.value)*2/75 +'rem';
                    path.replaceWith(
                        t.expressionStatement(t.stringLiteral(val))
                    );
                }
            }
        }
    };
}
