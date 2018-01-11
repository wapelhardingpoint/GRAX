
 # GRAX by HardingPoint
 
 **GRAX** allows you to quickly orchestrate Salesforce data, customer engagement, 
device, backoffice, and app engagement. The Engagement Graph is used within 
**GRAX**  for deep analytics, artificial intelligence, reporting, and App 
Development. The more data and relationships you link with your Engagement Graph the 
quicker it builds, learns (via AI), and reacts (via Engagement Manager) from your Neural Network.


* [`Grax Build`](https://engagementmanager.herokuapp.com) - <b>Instructions Below</b>
* [`Graph Connect`](https://graphconnect.hardingpoint.com/) - <b>Instructions Below</b>


## Deployment & Configuration Instructions

 ![GRAX : Engagement Manager](https://static.wixstatic.com/media/7e84ec_44f39af51cf14778853441032eb4af6c~mv2.png?dn=Grax+Installation_GITHUB.png "GRAX Installation")

### 1. Deploy GRAX Application to Heroku 

   [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/HardingPoint/EngagementManager/blob/master)
	 
	 1. Click the `Deploy` button above to begin the GRAX deployment to your Heroku instance
	 2. Specify your App name
	 3. Deploy App

### 2. Salesforce Configuration

 1. <a href="https://login.salesforce.com" target="_new">Login to Salesforce</a> or <a href="https://developer.salesforce.com/signup" target="_new">Create Salesforce Developer Edition</a> 

 2. <a href="https://login.salesforce.com/lightning/switcher?destination=classic" target="_new">Switch to Salesforce Classic</a> 
        
 3. <a href="https://login.salesforce.com/setup/ui/listCustomSettings.apexp" target="_new">Create a Salesforce Custom Setting</a>
    1. Click **New** Salesforce.com Custom Setting 
        1. Label: `HardingPoint` 
        1. Object Name: `HardingPoint`
        1. Setting Type: `Hierarchy/Public`
        1. Visibility: Public
        1. Click **Save**  
	
	    <a href="https://www.giphy.com/gifs/3o751RCGhvdsJhpmqQ/fullscreen" target="_blank"><img src="https://media.giphy.com/media/3o751RCGhvdsJhpmqQ/giphy.gif"/></a>
	
	
    1. Click New - Custom Field in HardingPoint Custom Setting
        1. Type `Text`
        1. Field Name: `ApiToken`
        1. Field Length: `255`
        1. Field Name: `ApiToken`
        1. Click **Next**
        1. Click **Save & New**  
	<a href="https://www.giphy.com/gifs/xULW8qduN0EW5oMvaU/fullscreen" target="_blank"><img src="https://media.giphy.com/media/xULW8qduN0EW5oMvaU/giphy.gif"/></a>
	
	
    1. Choose Type `Text` 
        1. Click **Next**
        1. Field Label: `GatewayToken`
        1. Length: `255`
        1. Field Name: `GatewayToken`
        1. Click **Next**
        1. Click **Save & New**  
	<a href="https://www.giphy.com/gifs/3oFzmgJZO6StlF2aE8/fullscreen" target="_blank"><img src="https://media.giphy.com/media/3oFzmgJZO6StlF2aE8/giphy.gif"/></a>
	
	
    1. Choose Type `Text` 
        1. Click **Next**
        1. Field Label: `LicenseToken`
        1. Length: `255`
        1. Field Name: `LicenseToken`
        1. Click **Next**
        1. Click **Save & New**  
	<a href="https://www.giphy.com/gifs/l0HUoqOXWsQEh18Va/fullscreen" target="_blank"><img src="https://media.giphy.com/media/l0HUoqOXWsQEh18Va/giphy.gif"/></a>
	
	
	
    1. Choose Type `URL`  
        1. Click **Next**
        1. Field Label: `graphdburl`
        1. Field Name: `graphdburl`
        1. Click **Next**
        1. Click **Save**


 4. <a href="https://login.salesforce.com/setup/ui/listCustomSettings.apexp" target="_new">Update Custom Settings in Salesforce (Build --> Develop --> Custom Settings)</a> 
    1. Under Custom Settings for HardingPoint, click on Manage
    1. Click on New Default Organization Level Value
    1. In your Heroku app created in step 1: 
	    
	    2. Go to Settings 
	    2. Click Reveal Config Vars 
	    
![enter image description here](https://static.wixstatic.com/media/7e84ec_d42208b2d3394c4e887650700210c8c3~mv2.png?dn=2017-12-19_11-05-17.png)
    
    	1. Update `GatewayToken` with `ENGAGEMENTGRAPH_GATEWAYTOKEN` from Heroku Config Variables
    	1. Update `ApiToken` with `ENGAGEMENTGRAPH_APITOKEN` from Heroku Config Variables
    	1. Update `LicenseToken` with `ENGAGEMENTGRAPH_LICENSETOKEN` from Heroku Config Variables
    	1. Update `graphdburl` with `GRAPHCONNECT_URL` from Heroku Config Variables (You can use any Neo4j URL)
    

 
<a href="https://giphy.com/gifs/3o751PqVyabriQV0qY/fullscreen" target="_blank"><img src="https://media.giphy.com/media/3o751PqVyabriQV0qY/giphy.gif"/></a>
    
    

 5. Confirm Login & Accept Terms -> <a href="https://graphconnect.hardingpoint.com">https://graphconnect.hardingpoint.com</a> 
	
    1. `Login via Salesforce - Normal Instance` - Use this for Developer or Production
    1. `Login via Salesforce - Sandbox Instance` - Sandbox Access Only  
    
    <a href="https://giphy.com/gifs/xULW8zzgQLnvnXrQJi/fullscreen" target="_blank"><img src="https://media.giphy.com/media/xULW8zzgQLnvnXrQJi/giphy.gif"/></a>
    

 6. Add Salesforce GRAX Connect Tab
    1. <a href="https://login.salesforce.com/setup/ui/tab/integ/integrationTabWizard.jsp?retURL=%2Fsetup%2Fui%2Fcustomtabs.jsp%3Fsetupid%3DCustomTabs%26retURL%3D%252Fui%252Fsetup%252FSetup%253Fsetupid%253DDevTools&setupid=CustomTabs" target="_new" >Add Salesforce Tab</a>
    1. Click `Next`
    1. Tab Label: `GRAX Connect`
    1. Tab Style: `Compass`
    1. Click `Next`
    1. Button or Link URL
        1. Copy -> `https://graphconnect.hardingpoint.com?embedded=true&orgid={!Organization.Id}&userid={!User.Id}&email={!User.Email}&phone={!User.Phone}&mobilephone={!User.MobilePhone}&companyname={!Organization.Name}&phone={!Organization.Phone}`
        1. Paste in `Link URL`
    	1. Click Save  
	<a href="https://giphy.com/gifs/3o752nFvB9fsXWbF3W/fullscreen" target="_blank"><img src="https://media.giphy.com/media/3o752nFvB9fsXWbF3W/giphy.gif"/></a>
	
	
### 3. Connect Salesforce Objects to the graph database -  GRAX Salesforce Object Connector

 1. Login via the GRAX Connect Tab created in the previous step
 1. Choose Visibility / Objects to connect
        1.  ![Harding Point Connect](https://static.wixstatic.com/media/983560_34b6e9735e6340d4bc37d4406c4ea43d~mv2_d_3104_1790_s_2.png/v1/fill/w_1730,h_998,al_c,usm_0.66_1.00_0.01/983560_34b6e9735e6340d4bc37d4406c4ea43d~mv2_d_3104_1790_s_2.png)  
        <a href="https://giphy.com/gifs/3oFzmorOpLAyNiMeQM/fullscreen" target="_blank"><img src="https://media.giphy.com/media/3oFzmorOpLAyNiMeQM/giphy.gif"/></a>
	
#### You have now deployed the Harding Point GRAX application to Heroku, configured Salesforce, added a GRAX Graph tab in Salesforce and are now ready to explore your data in your Neo4j Browser.
	

### 4. GRAX Discover 

1. Go back to your Heroku Dashboard and find your GRAX Application

![Graphie](https://static.wixstatic.com/media/7e84ec_5d31014286fb4f8aa1f4975a4ed20cf0~mv2.png "Launch Graphie")

Click on GrapheneDB to launch Neo4J browser. You are now able to view, query and analyze your Salesforce data. 



### View Graph

![Harding Point Engagement Graph](https://static.wixstatic.com/media/983560_7563ad3d347646e1a792e19a2c14e44c~mv2_d_2754_1836_s_2.png/v1/fill/w_1545,h_1030,al_c,usm_0.66_1.00_0.01/983560_7563ad3d347646e1a792e19a2c14e44c~mv2_d_2754_1836_s_2.png "Harding Point Graph Connect")
    
        
### Reproducing Grax Graph From Above Image

    1. Deploy Graph Connect Account (Did above already)
    1. Deploy Graph Connect Contact
    1. Deploy Graph Connect Opportunity
    1. Deploy Graph Connect Case
    

### Querying Data (Grax : Discover) 

When you deploy Graph Connect it automatically processes the history. Always use both sfdcorgid and sfdcid, as GraphConnect
supports loading multiple Salesforce instances into a single graph database. Below are sample queries.

For further reading on how the query language Cypher is different than SQL:
[`SQL to Cypher Guide`](https://neo4j.com/developer/guide-sql-to-cypher/)



##### Matching By Id

    MATCH (n{  sfdcorgid: '00D390000005LxxEAE', sfdcid: '0013900001ZglUaAAJ' }) 
    RETURN n;

##### Matching Node and Relationships

    MATCH (n{ sfdcorgid: '00D390000005LxxEAE', sfdcid: '0013900001ZglUaAAJ' })-[r]-(b) 
    RETURN b.name, labels(b);
    

##### Return Node and All Relationships

    MATCH (c:Account{  sfdcorgid: '00D390000005LxxEAE', sfdcid: '0013900001ZglUaAAJ' }) 
    WITH c
    OPTIONAL MATCH (c)-[r]-()
    RETURN c, r
   

##### Return Node with most Relationships it points to <font color="blue">(n)-[r]-<font color="red">></font>(x)</font>

    MATCH (n)-[r]->(x)
    RETURN n, COUNT(r)
    ORDER BY COUNT(r) DESC
    LIMIT 5

##### Return Node with most Relationships pointing to it <font color="blue">(n)<font color="red"><</font>-[r]-(x)</font>
    
    MATCH (n)<-[r]-(x)
    RETURN n, COUNT(r)
    ORDER BY COUNT(r) DESC
    LIMIT 5
    
    
#### Salesforce Specific Queries

##### Accounts with most Opportunities

    MATCH (n:Account)<-[r]-(x:Opportunity)
    RETURN n, COUNT(r)
    ORDER BY COUNT(r) DESC
    LIMIT 5
    
    
##### Accounts with most Cases

    MATCH (n:Account)<-[r]-(x:Case)
    RETURN n, COUNT(r)
    ORDER BY COUNT(r) DESC
    LIMIT 5

# Cleaning Graph


##### Delete All Data
    MATCH (n)
    DETACH DELETE n
    
    (Be Careful This Deletes Everything)
    
##### Delete One Node with Relationships
    MATCH (n { name: 'Andres' })
    DETACH DELETE n
    
##### Deleting Using the Salesforce Id
    
    MATCH (n {  sfdcorgid: '00D390000005LxxEAE', sfdcid: '0013900001ZglUaAAJ' })
    DETACH DELETE n
    
# Troubleshooting command line tools

Manually repush to DB (via Apex code) specify object type:
Execute in Salesforce Dev Console
Debug (Ctrl + E)

	HardingPointBatch.ProcessHistory('Object_type');

<hr/>    
 
[Visit Heroku Add-On Marketplace](https://elements.heroku.com/addons/engagementgraph)


## GRAX Relate 

GRAX Relate 

To access GRAX Relate, navigate to https://`<your-app-name>`.herokuapp.com/red 

###Credentials

1. Click on "Settings" in your App in Heroku
1. Click Reveal Config Vars
1. Admin User/Pwd - ENGAGEMENTGRAPH_ADMINUSER / ENGAGEMENTGRAPH_ADMINPWD 
1. Read Only User/Pwd - ENGAGEMENTMANAGER_READONLYUSER / ENGAGEMENTMANAGER_READONLYPWD


