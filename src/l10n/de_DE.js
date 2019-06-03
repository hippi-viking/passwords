(function() {
    let translations = {
            'Passwords'                           : 'Passwörter',
            'All'                                 : 'Alle',
            'Folders'                             : 'Ordner',
            'Recent'                              : 'Aktuelle',
            'Favorites'                           : 'Favoriten',
            'Shared'                              : 'Geteilt',
            'Tags'                                : 'Tags',
            'Security'                            : 'Sicherheit',
            'Trash'                               : 'Papierkorb',
            'Details'                             : 'Details',
            'Edit'                                : 'Bearbeiten',
            'Rename'                              : 'Umbenennen',
            'Delete'                              : 'Löschen',
            'Restore'                             : 'Wiederherstellen',
            'New Password'                        : 'Neues Passwort',
            'New Folder'                          : 'Neuer Ordner',
            'New Tag'                             : 'Neuer Tag',
            'Secure'                              : 'Sicher',
            'Weak'                                : 'Unsicher',
            'Weak (Duplicate)'                    : 'Unsicher (Duplikat)',
            'Weak (Outdated)'                     : 'Unsicher (Veraltet)',
            'Breached'                            : 'Kompromittiert',
            'Notes'                               : 'Notizen',
            'Share'                               : 'Teilen',
            'Revisions'                           : 'Versionen',
            'QR Code'                             : 'QR Code',
            'Password'                            : 'Passwort',
            'Username'                            : 'Benutzer',
            'Website'                             : 'Webseite',
            'Add Tags...'                         : 'Tags hinzufügen...',
            'Color'                               : 'Farbe',
            'Name'                                : 'Name',
            'Label'                               : 'Name',
            'General'                             : 'Allgemein',
            'Properties'                          : 'Eigenschaften',
            'Numbers'                             : 'Zahlen',
            'Special Characters'                  : 'Sonderzeichen',
            'More Options'                        : 'Erweiterte Optionen',
            'Favorite'                            : 'Favorit',
            'Encryption'                          : 'Verschlüsselung',
            'On the server'                       : 'Auf dem Server',
            'Custom Fields'                       : 'Eigene Felder',
            'Secret'                              : 'Geheimnis',
            'Text'                                : 'Text',
            'File'                                : 'Datei',
            'Value'                               : 'Wert',
            'Toggle visibility'                   : 'Sichtbarkeit umschalten',
            'Generate password'                   : 'Passwort generieren',
            'Simple Server Side Encryption V1'    : 'Verwenden Sie die einfache serverseitige Verschlüsselung in Variante 1',
            'Take some notes'                     : 'Machen Sie sich Notizen',
            'Save'                                : 'Speichern',
            'Create folder'                       : 'Ordner erstellen',
            'Folder created'                      : 'Ordner erstellt',
            'Creating folder failed'              : 'Erstellen des Ordners fehlgeschlagen',
            'Rename folder'                       : 'Ordner umbenennen',
            'Folder renamed'                      : 'Ordner umbenannt',
            'Renaming folder failed'              : 'Umbenennen des Ordners fehlgeschlagen',
            'Folder moved'                        : 'Ordner verschoben',
            'Moving folder failed'                : 'Verschieben des Ordners fehlgeschlagen',
            'Delete folder'                       : 'Ordner löschen',
            'Do you want to delete the folder'    : 'Möchten Sie den Ordner und alle enthaltenen Elemente löschen?',
            'Folder deleted'                      : 'Ordner gelöscht',
            'Deleting folder failed'              : 'Löschen des Ordners fehlgeschlagen',
            'Folder restored'                     : 'Ordner wiederhergestellt',
            'Restoring folder failed'             : 'Wiederherstellen des Ordners fehlgeschlagen',
            'Create tag'                          : 'Tag erstellen',
            'Tag created'                         : 'Tag erstellt',
            'Creating tag failed'                 : 'Erstellen des Tags fehlgeschlagen',
            'Edit tag'                            : 'Tag bearbeiten',
            'Generate random color'               : 'Zufällige Farbe auswählen',
            'Tag saved'                           : 'Tag gespeichert',
            'Saving tag failed'                   : 'Speichern des Tags fehlgeschlagen',
            'Delete tag'                          : 'Tag löschen',
            'Do you want to delete the tag'       : 'Möchten Sie den Tag löschen?',
            'Tag deleted'                         : 'Tag gelöscht',
            'Deleting tag failed'                 : 'Löschen des Tags fehlgeschlagen',
            'Tag restored'                        : 'Tag wiederhergestellt',
            'Restoring tag failed'                : 'Wiederherstellen des Tags fehlgeschlagen',
            'Create password'                     : 'Neues Passwort erstellen',
            'Password created'                    : 'Passwort erstellt',
            'Creating password failed'            : 'Erstellen des Passworts fehlgeschlagen',
            'Edit password'                       : 'Passwort bearbeiten',
            'Password saved'                      : 'Passwort gespeichert',
            'Saving password failed'              : 'Speichern des Passworts fehlgeschlagen',
            'Password moved'                      : 'Passwort verschoben',
            'Moving password failed'              : 'Verschieben des Passworts fehlgeschlagen',
            'Delete password'                     : 'Passwort löschen',
            'Do you want to delete the password'  : 'Möchten Sie das Passwort löschen?',
            'Password deleted'                    : 'Passwort gelöscht',
            'Password restored'                   : 'Passwort wiederhergestellt',
            'Restoring password failed'           : 'Wiederherstellen des Passworts fehlgeschlagen',
            'Open Url'                            : 'Webseite öffnen',
            'Copy Url'                            : 'Webseite kopieren',
            'Copy User'                           : 'Benutzer kopieren',
            'Copy Password'                       : 'Passwort kopieren',
            '{element} was copied to clipboard'   : '{element} wurde in die Zwischenablage kopiert',
            'Error copying {element} to clipboard': '{element} konnte nicht in die Zwischenablage kopiert werden',
            'Last modified on {date}'             : 'Zuletzt geändert am {date}',
            'Restore revision'                    : 'Version wiederherstellen',
            'Revision restored'                   : 'Version wiederhergestellt',
            'Restoring revision failed'           : 'Wiederherstellen der Version fehlgeschlagen',
            'Do you want to restore the revision?': 'Möchten Sie die Version wiederherstellen?',
            'Shared with you'                     : 'Mit Ihnen geteilt',
            'Shared by you'                       : 'Von Ihnen geteilt',
            'Statistics'                          : 'Statistiken',
            'Created on'                          : 'Erstellt am',
            'Last updated'                        : 'Zuletzt geändert',
            '{count} revisions'                   : '{count} Versionen',
            'Shares'                              : 'Freigaben',
            '{count} shares'                      : '{count} Freigaben',
            'Encryption on server'                : 'Verschlüsselung auf dem Server',
            'Encryption on client'                : 'Verschlüsselung auf dem Endgerät',
            'No encryption'                       : 'Keine Verschlüsselung',
            'Simple encryption (Gen. 1)'          : 'Einfache Verschlüsselung (Generation 1)',
            'Simple encryption (Gen. 2)'          : 'Einfache Verschlüsselung (Generation 2)',
            'Advanced encryption (SSE V2)'        : 'Erweiterte Verschlüsselung (SSE V2)',
            'Encryption with libsodium'           : 'Verschlüsselung mit Libsodium',
            'More'                                : 'Mehr',
            'Backup and Restore'                  : 'Sichern & Wiederherstellen',
            "Settings"                            : "Einstellungen",
            'Handbook'                            : 'Handbuch',
            '{name} has shared this with you'     : '{name} hat dieses Passwort mit Ihnen geteilt',
            '{editable} and {shareable}.'         : '{editable} und {shareable}.',
            'Editing allowed'                     : 'Bearbeiten erlaubt',
            'Editing disallowed'                  : 'Bearbeiten nicht erlaubt',
            'sharing allowed'                     : 'teilen erlaubt',
            'sharing disallowed'                  : 'teilen nicht erlaubt',
            'Search user'                         : 'Benutzer suchen',
            'Set expiration date'                 : 'Ablaufdatum setzen',
            'Expires {date}'                      : 'Läuft {date} ab',
            'Choose expiration date'              : 'Wählen Sie ein Ablaufdatum oder lassen Sie das Feld leer um endlos zu teilen',
            'Please choose a date in the future'  : 'Bitte Ablaufdatum in der Zukunft auswählen',
            'Invalid date'                        : 'Ungültiges Datum',
            'The user {uid} does not exist'       : 'Der Nutzer {uid} existiert nicht',
            'Unable to share password: {message}' : 'Kann Passwort nicht teilen: {message}',
            'Toggle write permissions'            : 'Schreibrechte umschalten',
            'Toggle share permissions'            : 'Weiterverteilrechte umschalten',
            'Stop sharing'                        : 'Teilen beenden',
            'Date'                                : 'Datum',
            'Default Cache (0 files, 0 B)'        : 'Standard Cache (0 Dateien, 0 B)',
            'Avatars Cache (0 files, 0 B)'        : 'Profilbilder (0 Dateien, 0 B)',
            'Favicon Cache (0 files, 0 B)'        : 'Favicon (0 Dateien, 0 B)',
            'Preview Cache (0 files, 0 B)'        : 'Webseitenansichten (0 Dateien, 0 B)',
            'Passwords Cache (0 files, 0 B)'      : 'Schlechte Passwörter (0 Dateien, 0 B)',
            'Changed'                             : 'Geändert',
            'Modified'                            : 'Geändert',
            'Edited'                              : 'Bearbeitet am',
            'Created'                             : 'Erstellt am',
            'Folder'                              : 'Ordner',
            'Revision'                            : 'Version',
            'Url'                                 : 'Webseite',
            'Parent'                              : 'Überordner',
            'Delete All Items'                    : 'Alles löschen',
            'Restore All Items'                   : 'Alles wiederherstellen',
            'Restore Items'                       : 'Objekte wiederherstellen',
            'Restore all items in trash?'         : 'öchten Sie alle Objekte im Papierkorb wiederherstellen?',
            'Restore this item'                   : 'Dieses Objekt wiederherstellen',
            'Items restored'                      : 'Objekte wiederhergestellt',
            'Empty Trash'                         : 'Papierkorb leeren',
            'Delete all items in trash?'          : 'öchten Sie alle Objekte im Papierkorb permanent löschen?',
            'Trash emptied'                       : 'Papierkorb geleert',
            'Search'                              : 'Suche',
            'Use the search box to search'        : 'Benutze die Suchbox zum suchen',
            'Search everywhere for "{query}"'     : 'Suche überall nach "{query}"',
            'There is nothing here'               : 'Hier ist nichts',
            'Click on "+" to add something'       : 'Drücken Sie auf das "+"-Symbol, um etwas hinzuzufügen',
            'Deleted items will appear here'      : 'Gelöschte Objekte werden hier erscheinen',
            'No passwords were shared with you'   : 'Es sind derzeit keine Passwörter mit Ihnen geteilt',
            'You did not share any passwords'     : 'Sie haben derzeit keine Passwörter geteilt',
            'Your favorites will appear here'     : 'Ihre Favoriten werden hier erscheinen',
            'Better check the other sections'     : 'Möglicherweise haben Sie noch keine Passwörter',
            'That\'s probably a good sign'        : 'Das ist sicherlich gut so',
            'Go to {href}'                        : 'Gehe zu {href}',
            'Contents'                            : 'Inhalt',
            'Figure {count}: {title}'             : 'Abbildung {count}: {title}',
            'Unable to fetch page: {message}.'    : 'Die Seite kann nicht angezeigt werden: {message}.',
            'Invalid content type {mime}'         : 'Falscher Dateityp {mime}',
            'No content available'                : 'Es ist kein Inhalt vorhanden',
            'Not Found'                           : 'Seite nicht gefunden',
            'Still need help?'                    : 'Noch Fragen?',
            'Ask in our forum!'                   : 'Wir helfen gerne!',
            'Found an error?'                     : 'Fehler gefunden?',
            'Tell us!'                            : 'Sag uns bescheid!',
            'Network error'                       : 'Netzwerkfehler',
            'Unable to load {module}'             : 'Das Modul {module} konnte nicht geladen werden. Möglicherweise ist die Verbindung zu Nextcloud unterbrochen',
            'Sort by name'                        : 'Sortiere nach Name',
            'Sort by modified date'               : 'Sortiere nach zuletzt geändert',
            '{passwords} passwords'               : '{passwords} Passwörter',
            '1 password'                          : '1 Passwort',
            '{folders} folders'                   : '{folders} Ordner',
            '1 folder'                            : '1 Ordner',
            '{tags} tags'                         : '{tags} Tags',
            '1 tag'                               : '1 Tag',
            'Nothing'                             : 'Nichts',
            ' and '                               : ' und ',
            'match'                               : 'passen zu',
            'matches'                             : 'passt zu',
            'Created by'                          : 'Erstellt von',
            'CLIENT::MAINTENANCE'                 : 'System Wartungsmodus',
            'CLIENT::UNKNOWN'                     : 'Nicht Vorhanden',
            'CLIENT::SYSTEM'                      : 'System',
            'CLIENT::PUBLIC'                      : 'Öffentlicher Zugriff',
            'CLIENT::CRON'                        : 'Automatische Hintergrundaufgabe',
            'CLIENT::CLI'                         : 'Server Kommandozeile',
            'Cancel'                              : 'Abbrechen',
            'Ok'                                  : 'Ok',
            'true'                                : 'ja',
            'false'                               : 'nein',
            'yes'                                 : 'ja',
            'no'                                  : 'nein'
        },
        helpTexts    = {
            'You have reached the maximum length of 4096 characters'          : 'Sie haben die maximale Länge von 4096 Zeichern erreicht',
            'We could not find anything for "{query}"'                        : 'Die Suche nach "{query}" erzielte keinen Treffer',
            'The page "{page}" could not be fetched from the handbook server.': 'Die Seite "{page}" konnte nicht vom Handbuch-Server geholt werden.',
            'Some data is waiting to be synchronized'                         : 'Es sind Daten zur synchronisation vorhanden',
            'You will be logged out in {time} seconds'                        : 'Du wirst in {time} Sekunden ausgeloggt'
        },
        longTexts    = {
            'Today in 2018, the first version of passwords was published. Thank you for using the app.': 'Heute im Jahr 2018 wurde die erste Version von Passwords veröffentlicht. Danke, dass Sie die App benutzen.'
        };

    OC.L10N.register(
        'passwords',
        Object.assign(translations, helpTexts, longTexts),
        'nplurals=2; plural=(n != 1);'
    );
}());