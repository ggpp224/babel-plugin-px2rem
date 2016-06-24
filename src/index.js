
export default function ({ types: t }) {
    return {
        visitor: {
            ObjectProperty: {
                exit({ node }) {
                    var valNode = node.value;
                    var keyNode = node.key;
                    var isAllow = /^padding|^margin|^background|^width|^height|lineHeight|fontSize|^top|^left|^right|^bottom/i.test(keyNode.name||keyNode.value);
                    var val = valNode.value;
                    if (valNode.type ==='StringLiteral' && /px/.test(val) && isAllow) {
                        valNode.value = val.replace(/(\d+)px/g,function (px) {
                            var num = parseFloat(RegExp.$1);
                            return num*2/75 + 'rem';
                        });
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
