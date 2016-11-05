# API to get weather data
import pyowm
# unique API key
owm = pyowm.OWM('2b14eccb4dae05ee19ca49a8e39fb16e');
# time for delays
import time
# datetime for time
import datetime

# call over and over, but can't do any more than 60 times per minute
while (True):
    # get the current weather in Ithaca
#     print 'Getting weather in Ithaca'
    obs = owm.weather_at_place('ithaca, ny');
    w = obs.get_weather();
    # only want current temperature reading (celsius)
    out_temp = w.get_temperature('celsius')['temp'];
    print out_temp;
    time.sleep(1);
    
    # get the hour
    d = datetime.datetime.now(); 
    
    
    