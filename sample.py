text = "\u8c37\u3055\u3093"

import codecs
 
text = codecs.decode(text.encode())

print(text)