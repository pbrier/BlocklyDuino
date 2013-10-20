from mod_python import apache
import os
import logging
import subprocess
import tempfile
import shutil

def compile(req, source = None):
    tmp = tempfile.mkdtemp()
    sourcefileName  = tmp + '/source.inc'
    targetfileName  = tmp + '/firmware.bin'
    logfileName     = tmp + '/compiler.log'
    cmdfileName     = "/var/www/blockly/compiler/compiler.cmd"
    logfileDir      = os.path.dirname(logfileName)

    if not os.path.exists(logfileDir):
        os.makedirs(logfileDir)

    if not os.path.exists(logfileName):
        open(logfileName, 'a').close()
    
    logging.basicConfig(level=logging.DEBUG
        ,format='%(asctime)s [%(levelname)s] %(message)s'
        ,datefmt='%d %b %y %H:%M:%S'
        ,filename=logfileName
        ,filemode='a')
    logging.info('received source')


    # make sure the user provided all the parameters
    if source == None:
        return createErrorPage("No source file received, cannot compile!") 

    logging.info('Saving incoming source to file ' + sourcefileName)
    try:
        src = source.replace('\r', '')
        file = open(sourcefileName, "wb")
        file.write(src)
        file.close()
    except Exception, e:    
        return createErrorPage("Source file cannot be written to file %s" % sourcefileName) 


    logging.info('Compiling incoming source to file ' + targetfileName)
    try:
        process = subprocess.Popen([cmdfileName,sourcefileName,targetfileName]   , stdout=subprocess.PIPE)
        logging.info(process.stdout.read())

    except Exception, e:    
        return createErrorPage("Compile of file %s failed. Exception: %s" % (sourcefileName,e.message) ) 
        
    if not os.path.exists(targetfileName):
        return createErrorPage("Output file %s not found. " % (targetfileName) ) 
        
    logging.info('Sending image file to client: ' + targetfileName)
    try:
        req.content_type = 'application/octet-stream' 
        req.headers_out['Content-Disposition'] = 'attachment; filename=%s'%os.path.basename(targetfileName)
        req.sendfile(targetfileName);
        logging.info('Compiled succesfully. Downloaded file %s to client.' % targetfileName)
        shutil.rmtree(tmp)
        
    except Exception, e:
        return createErrorPage("Cannot find binary file for upload:  %s  Exception: %s" (targetfileName,e.message) )


def createErrorPage(message):
    logging.warning(message)
    return """\
<html><body>        
=========================================
<p>
    <h1>Error while compiling source code:</h1> 
<p>
    %s
<p> 
=========================================
</body></html>"""% message

        
