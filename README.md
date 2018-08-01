#azBee

azBee is beehive monitoring system that tracks the state of a bee colony by analyzing the bee buzzing signals.

Research shows that the sound patterns produced by the colony can indicate its health status, colony's strength, if there is a queen in the hive or if the colony prepares to swarm.

The proposed solution uses a Raspberry Pi to capture and send the sound of the hive and Microsoft Azure IoT and Serverless technologies as a back-end for audio spectrum analysis and notifications.

The Raspberry Pi is powered by a portable charger external battery pack and it is equipped with a microphone and a 3G shield. At regular intervals, it records and uploads compressed wav files to Microsoft Azure Storage. An Azure Function is triggered when the audio file is uploaded to the blob storage. The serverless function decodes the audio data, generates the audio spectrum and analyses it. When a frequency/amplitude pattern is identified in the spectrum, an alert is sent via email. 

Given the crucial role honeybees play in agriculture and the drastic decrease in the bee population in the last few years, I believe this is an interesting problem to solve. Using a combination of cloud-based technology and low-cost hardware for hive monitoring, beekeepers can maintain a healthy colony and avoid losing honey production.
