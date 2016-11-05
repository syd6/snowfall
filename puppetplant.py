#USE THIS FOR REFERENCE WHEN PULLING WEATHER DATA FOR YOUR OWN WEBSITE


# API to get weather data
import pyowm
# unique API key
owm = pyowm.OWM('2b14eccb4dae05ee19ca49a8e39fb16e');
# serial for arduino communication
import serial
# time for delays
import time
# datetime for time
import datetime
# urllib for sending data to website
import urllib2, urllib
# sys for arguments
import sys

# connect and mandatory wait
if (len(sys.argv) == 1):
    ard_port = '/dev/cu.usbmodem14141';
else :
    ard_port = sys.argv[1]
a = serial.Serial(ard_port, 9600);
time.sleep(2);
# send start message, wait for ack
# a.write('a');
# time.sleep(1);
# a.readline();

# call over and over, but can't do any more than 60 times per minute
while (True):
    # get the current weather in Ithaca
#     print 'Getting weather in Ithaca'
    obs = owm.weather_at_place('ithaca, ny');
    w = obs.get_weather();
    # only want current temperature reading (celsius)
    out_temp = w.get_temperature('celsius')['temp'];
    print out_temp;
    a.write(str(out_temp));
    time.sleep(1);
    in_temp = a.readline();
    print in_temp
    
    # get the hour
    d = datetime.datetime.now();
    a.write(str(d.hour));
    time.sleep(1);
    a.readline();
    a.write(str(d.minute));
    time.sleep(1);
    a.readline();
    
    # post data stuff
    temp_data = [('out_temp', str(out_temp)), ('in_temp', str(in_temp))];
    temp_data = urllib.urlencode(temp_data);
    post_path = 'http://localhost/demo.php';
    req = urllib2.Request(post_path, temp_data);
    req.add_header('Content-type', 'application/x-www-form-urlencoded');
    
    
    