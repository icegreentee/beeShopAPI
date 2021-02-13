'use strict'
const NodeRSA = require('node-rsa');

exports.decrypt = function (data) {
    const privateKey = 
    `-----BEGIN PRIVATE KEY-----\nMIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAOgxyBywu0axkFXY
    S81+7eVbqgm4SALF581lZw/JuGh95sICQuFwdzOnVYPmnaVqiZPWzhJrN31kI03w
    WwBSmyCegh37NUxxFl6K8lxwIY/cn7Tkz0WXeTjVCEEF1GVuqxXV77DZKLykB5F9
    zIpjeTTkaJ8kVBelJjbZqD+V7qMzAgMBAAECgYAwO9ckDpp4rv4atxnYEFv+3zHN
    XximatIiWsQ0BWVnX3AGMU4PYruAYWxkQA3ThPQbX+3i6Z7XT2v+DsX4pTBQCwY6
    wtyR3mhhjZxkKZl13J/VZ0+bgFaCPpXuLQu5J/aKkZxBhR2Nvl4KSMj2xf82m2OS
    /lzgvosf01dWHt3XwQJBAPtWuA9uLk09cShUqmUcU1qoFpq+r6w2yZtR3IV7E/WK
    mpxJqRn7D+AtGXvUUHWBWy1AVyFM4n5xjgQXbCQS0IMCQQDsgCve7acNup2eOey/
    9hcflu0+zQaYOFgwRP014uLClOgi16bqyK4odbQqYAibYWfdGct95aPhi+KXhxhz
    xwORAkEAwRl0Gi7NlfxBpvm9XCdyBvGjREqCj24cYJ95LHhN8lUFylNxfwt7vAEK
    Vi/djRnQIikPh/8Y+Ipn0M7p/6EQ3wJBAIdOgUsG3redGAZpj4j4C5y4Jb3zYR1/
    xvy+y7ujtiarOPCOPuI+tF1TkiNYVDRJkznNQz4hPxSQirA0y4mZx/ECQHIi6BUA
    az8Dw9TtXd0mKpZyHTxG09yJSaxKQ8JlrCz3L1+saitvVmgW2Mdot0aaJ8RzP4Yd
    O25z6sK/tLSrAZY=\n-----END PRIVATE KEY-----`;
    ;
    const nodersa = new NodeRSA(privateKey);
    nodersa.setOptions({encryptionScheme: 'pkcs1'}) 
    const decrypted = nodersa.decrypt(data, 'utf8');
    return decrypted;
}