#include <mbed.h>

#define LED1 P1_19
#define LED2 P1_25
#define LED3 P0_8
#define LED4 P0_9
#define LED5 P0_22
#define LED6 P0_13
#define LED7 P0_14
#define BUTTON P0_1

#define SERVO1 P0_19
#define SERVO2 P0_18

#define HIGH 1
#define LOW 0

#define INPUT 0
#define OUTPUT 1

void pinMode(int pin, int dir)
{

}

void digitalWrite(int pin, int state)
{
  DigitalInOut p((PinName)pin);
  p.output();
  p.mode(PullDown);
  p = state;
}

int digitalRead(int pin)
{

}

void loop();
void setup();

// main
int main()
{
  setup();
  while(1) loop();
}

