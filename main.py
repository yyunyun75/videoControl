# VideoControl handler 
# Author: Leslie Leslie

import os
import webapp2
import json
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api import urlfetch

class MainHandler(webapp2.RequestHandler):
    def get (self, q):
        if q is None:
            q = 'index.html'

        path = os.path.join (os.path.dirname (__file__), q)
        self.response.headers ['Content-Type'] = 'text/html'
        self.response.out.write(template.render (path, {}))   


app = webapp2.WSGIApplication ([
	('/(.*html)?', MainHandler)
], 	debug=False)