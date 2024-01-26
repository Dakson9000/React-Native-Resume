import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import data from './Data';

export default function App() {
    // Load the 'Montserrat' font
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Black': require('./src/assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-BlackItalic': require('./src/assets/fonts/Montserrat-BlackItalic.ttf'),
        'Montserrat-BoldItalic': require('./src/assets/fonts/Montserrat-BoldItalic.ttf'),
        'Montserrat-Italic': require('./src/assets/fonts/Montserrat-Italic.ttf'),
        'Montserrat-Light': require('./src/assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-SemiBoldItalic': require('./src/assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat-ExtraBold': require('./src/assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-ExtraBoldItalic': require('./src/assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
        'Montserrat-ExtraLight': require('./src/assets/fonts/Montserrat-ExtraLight.ttf'),

        'Montserrat-Thin': require('./src/assets/fonts/Montserrat-Thin.ttf'),

      });
    if (!fontsLoaded) return null;
  
    const MyText = ({ style, ...props }) => {
        return <Text style={[{ fontFamily: 'Montserrat-Regular',}, style]} {...props} />;
    };
        
    //Helper render method that renders paragraphs
    /*
        Category
        Line -----------------
        [Title
        Location/Info | Date
        Description
            Subdescription(s)
        ] ...
    */
    
    function renderParagraph(title, location, date, description, subdescriptions) {
        //If there are multiple subdescriptions, render them
        return (
            <View style={styles.paragraph}>
                {title && <MyText style={styles.headerText3}>{title}</MyText>}
                {location && date && <Text style={styles.bodyText2}>{location} | {date}</Text>}
                {description && <MyText style={styles.bodyText}>{description}</MyText>}
                {subdescriptions.length > 0 && subdescriptions.map((subdescription, index) => (
                    <Text key={index} style={styles.bodyText3}>{subdescription}</Text>
                ))}
            </View>
        );
    }

    function renderSection(title, paragraphs)
    {
        //For each paragraph, render it using renderParagraph
        return (
            <View style={styles.paragraph}>
                <Text style={styles.headerText2}>{title}</Text>
                <View style={styles.line}></View>
                {paragraphs.map((paragraph, index) => (
                    renderParagraph(paragraph.title, paragraph.location, paragraph.date, paragraph.description, paragraph.subdescriptions, index)
                ))}
            </View>
        );
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <MyText style={styles.headerText}>Resume</MyText>
            </View>
            <ScrollView style={styles.body}>
                {data.map((section, index) => (
                    renderSection(section.title, section.paragraphs, index)
                ))}
            </ScrollView>
                

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#7DCEA0',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },

  headerText: {
    fontSize: 30,
    fontFamily: 'Montserrat-Light',

  },
  headerText2: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',

  },
  headerText3: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBoldItalic',

  },
  bodyText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',

  },
  bodyText2: {
    fontSize: 12,
    fontFamily: 'Montserrat-Light',

  },
  bodyText3: {
    fontSize: 12,
    paddingLeft: 15,
    fontFamily: 'Montserrat-Light',
  },
  paragraph: {
    paddingBottom: 5, 
  },
  body: {
    backgroundColor: '#F0FFFF',
    padding: 20,
    flex: 1,
  },
  line : {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },


});
