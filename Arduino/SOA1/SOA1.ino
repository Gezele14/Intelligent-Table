#include <ESP8266WiFi.h>
#include <infrarrojo.h>
#include <PubSubClient.h>

//------------------------Variables Globales--------------------------------
int contconecxion =  0;

const char *ssid = "Gerardoz";
const char *pass = "gera1234";

char SERVER[50] = "soldier.cloudmqtt.com";
int SERVERPORT = 12885;
String USERNAME = "Mesa1";
char PASSWORD[50] = "Mesa1rest";

char ESTADO[50];
char PLACA[50];

infrarrojo estado(5);
int VALOR; // Variable que recibe el dato
int ocupada = 15; //redefinicion de pin de arduino para led indicador
int disponible = 12;
int mantenimiento = 13;
int btn = 4;
int val = 0;
int limpieza = 0;
int old_val = 0;
int led_estado; //variable
char valueEstado[20];
String strtemp = "";

//------------------------Conexion a Wifi--------------------------------
WiFiClient wifi;
PubSubClient client(wifi);


//----------------------------Callback-----------------------------------
void callback(char* topic, byte* payload, unsigned int lenght){
  char PAYLOAD[5] = "";

  Serial.print("Mensaje Recibido: ");
  Serial.print(topic);

  for (int i = 0; i< lenght; i++){
    PAYLOAD[i] = (char)payload[i];
  }

  Serial.print(PAYLOAD);

}

//----------------------------Reconnect-----------------------------------
void reconnect(){
  uint8_t retries = 3;
  //loop hasta conectarse
  Serial.print("Intentando conectarse a MQTT");
  while(!client.connected()){
    Serial.print(".");
    String clientid = "ESP8266Client-";
    //Crea un id de cliente al azar
    clientid += String(random(0xffff), HEX);
    //Attemp to connect
    USERNAME.toCharArray(PLACA, 50);
    if(client.connect("", PLACA, PASSWORD)){
      Serial.println("Conectado");
    }else{
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println("intenta nuevamente en 5segundos");
      delay(5000);
    }
    retries--;
    if(retries == 0){
      while(1);
    }
  }
}

//----------------------Configuracion del setup--------------------------
void setup(){
  pinMode(ocupada, OUTPUT);
  pinMode(disponible, OUTPUT);
  pinMode(mantenimiento, OUTPUT);
  pinMode(btn, INPUT);
  Serial.begin(9600);

  //conexion wifi
  WiFi.begin(ssid,pass);
  Serial.print("Conectando a wifi");
  while(WiFi.status() != WL_CONNECTED and contconecxion < 50){
    ++contconecxion;
    delay(500);
    Serial.print(".");
  }

  client.setServer(SERVER, SERVERPORT);
  client.setCallback(callback);

  String estado = USERNAME + "/" + "estado";
  estado.toCharArray(ESTADO, 50);
}

//----------------------LOOP--------------------------
void loop(){
  if (!(bool)client.connected()){
    reconnect();
  }
  client.loop();

  client.publish(ESTADO, valueEstado);
  
  led_estado = estado.lectura(VALOR);
  val = digitalRead(btn);
  if ((val == HIGH) && (old_val == LOW)){
    limpieza=1-limpieza;
    delay(10);
  }
  old_val = val;
  if(limpieza){
    digitalWrite(mantenimiento,HIGH);
    digitalWrite(disponible,LOW);
    digitalWrite(ocupada,LOW);
    strtemp = "Limpiando";
    strtemp.toCharArray(valueEstado, 20);
  }
  else if(led_estado == 1){
    digitalWrite(mantenimiento,LOW);
    digitalWrite(disponible,HIGH);
    digitalWrite(ocupada,LOW);
    strtemp = "Disponible";
    strtemp.toCharArray(valueEstado, 20);
    
  }
  else{
    digitalWrite(mantenimiento,LOW);
    digitalWrite(disponible,LOW);
    digitalWrite(ocupada,HIGH);
    strtemp = "Ocupada";
    strtemp.toCharArray(valueEstado, 20);
  }
  delay(100);
}
 
