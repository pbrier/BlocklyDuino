from mod_python import apache


def email(req, name, email, comment):
    # make sure the user provided all the parameters
    if not (name and email and comment):
        return "A required parameter is missing, \
               please go back and correct the error"

    print "Received request email. Parameters name %s email %s comment %s" % (name, email,comment)

    s = """\
<html>
====<br>
<h1>Python mod_python test page Response</h1>

<p>
Dear %s,<br><br>
                                                                                                                                       
Thank You for your kind comments, we will get back to you shortly.<br><br>

Your email adress is: %s.<br>

And your comment is: %s <br>


Thank you! <br><br>

(Note that this repsonse comes from the python code in file mptest.py)

</html>""" % (name,email,comment)

    return s
