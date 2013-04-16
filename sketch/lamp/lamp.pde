
int ledPins[] = { 5, 6, 7, 8, 9, 10, 11, 12, 13 };

const boolean ON = HIGH;
const boolean OFF = LOW;

const boolean RED[] = {ON, OFF, OFF};
const boolean GREEN[] = {OFF, ON, OFF};
const boolean BLUE[] = {OFF, OFF, ON};
const boolean YELLOW[] = {ON, ON, OFF};
const boolean CYAN[] = {OFF, ON, ON};
const boolean MAGENTA[] = {ON, OFF, ON};
const boolean WHITE[] = {ON, ON, ON};
const boolean BLACK[] = {OFF, OFF, OFF};

void setup() {
  Serial.begin(9600);

  for(int i = 0; i < 9; i++)
    pinMode(ledPins[i], OUTPUT);
}

int incomingByte = 0;
void loop() {
  // Check if there's a serial message waiting.
  if (Serial.available() > 0) {
    // If there is, read the incoming byte.
    incomingByte = Serial.read();
    if (incomingByte == 'r') {
        setColor(ledPins, RED);
    } else if (incomingByte == 'g') {
        setColor(ledPins, GREEN);  
    } else if (incomingByte == 'b') {
        setColor(ledPins, BLUE);
    } else if (incomingByte == 'y') {
        setColor(ledPins, YELLOW);
    } else if (incomingByte == 'c') {
        setColor(ledPins, CYAN);
    } else if (incomingByte == 'm') {
        setColor(ledPins, MAGENTA);
    } 
  }
}

void setColor(int* led, const boolean* color)
{
  for(int i = 0; i < 3; i++){
    digitalWrite(led[i], color[i]);
    digitalWrite(led[i], color[i+3]);
    digitalWrite(led[i], color[i+6]);
  }
}
