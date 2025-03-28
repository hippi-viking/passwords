<template>
    <div class="backup-dialog import-container">
        <div class="step-1">
            <translate tag="h1" say="Choose Format"/>

            <div class="step-content">
                <select v-model="source" id="passwords-import-source" :disabled="importing">
                    <translate tag="option" value="" say="Choose import format" v-if="!source"/>
                    <translate tag="option" value="json" say="Database Backup"/>
                    <translate tag="option" value="pwdCsv" say="Passwords CSV"/>
                    <translate tag="option" value="fldCsv" say="Folder CSV"/>
                    <translate tag="option" value="tagCsv" say="Tags CSV"/>
                    <translate tag="option" value="legacy" say="ownCloud Passwords"/>
                    <translate tag="option" value="pmanJson" say="Passman JSON"/>
                    <translate tag="option" value="pmanCsv" say="Passman CSV"/>
                    <translate tag="option" value="enpass" say="Enpass JSON"/>
                    <translate tag="option" value="bitwarden" say="Bitwarden JSON"/>
                    <translate tag="option" value="bitwardenCsv" say="Bitwarden CSV"/>
                    <translate tag="option" value="keepass" say="KeePassX CSV"/>
                    <translate tag="option" value="lastpass" say="LastPass CSV"/>
                    <translate tag="option" value="dashlane" say="Dashlane CSV"/>
                    <translate tag="option" value="roboform" say="RoboForm CSV"/>
                    <translate tag="option" value="safeincloud" say="SafeInCloud CSV"/>
                    <translate tag="option" value="chrome" say="Chrome / Google Passwords CSV"/>
                    <translate tag="option" value="firefox" say="Firefox Lockwise CSV"/>
                    <translate tag="option" value="csv" say="Other / Custom CSV"/>
                </select>
                <custom-csv-help v-on:trigger="source = 'csv'" :current="source"/>
            </div>
        </div>

        <div class="step-2" v-if="step > 1">
            <translate tag="h1" say="Select File"/>
            <div class="step-content">
                <translate tag="div"
                           class="file warning"
                           :variables="{expected: mime, actual: fileMime}"
                           say="The file has the type &quot;{actual}&quot; but &quot;{expected}&quot; is expected. You might have chosen the wrong file or importer."
                           v-if="fileMime.length !== 0 && fileMime !== mime"/>
                <translate tag="div"
                           class="file warning"
                           :variables="{service: source.capitalize()}"
                           say="{service} is known to to generate faulty export files. Consult the manual for help if the file can not be parsed."
                           v-if="csv.badQuotes && source !== 'csv'"/>

                <div v-if="source === 'csv'">
                    <translate tag="h3" say="CSV Options"/>
                    <div class="passwords-import-option-row">
                        <translate tag="label" for="passwords-import-csv-line" say="Line Break"/>
                        <select id="passwords-import-csv-line" @change="setNewLine($event)" :disabled="importing">
                            <translate tag="option" value="auto" say="Detect"/>
                            <translate tag="option" value="rn" say="Windows (CRLF, \r\n)"/>
                            <translate tag="option" value="n" say="Linux (LF, \n)"/>
                            <translate tag="option" value="r" say="Mac (CR, \r)"/>
                        </select>
                    </div>
                    <div class="passwords-import-option-row">
                        <translate tag="label" for="passwords-import-csv-delimiter" say="Field Delimiter"/>
                        <select id="passwords-import-csv-delimiter" v-model="csv.delimiter" :disabled="importing">
                            <translate tag="option" value="auto" say="Detect"/>
                            <translate tag="option" value="," say="Comma"/>
                            <translate tag="option" value=";" say="Semicolon"/>
                            <translate tag="option" value=" " say="Space"/>
                            <translate tag="option" value="	" say="Tab"/>
                        </select>
                    </div>
                    <div class="passwords-import-option-row">
                        <translate tag="label" for="passwords-import-csv-quote" say="Quote Character"/>
                        <select id="passwords-import-csv-quote" v-model="csv.quotes" :disabled="importing">
                            <translate tag="option" value='"' say="Quote"/>
                            <translate tag="option" value="'" say="Single Quote"/>
                        </select>
                    </div>
                    <div class="passwords-import-option-row">
                        <translate tag="label" for="passwords-import-csv-escape" say="Escape Character"/>
                        <select id="passwords-import-csv-escape" v-model="csv.escape" :disabled="importing">
                            <translate tag="option" value='"' say="Quote"/>
                            <translate tag="option" value="'" say="Single Quote"/>
                            <translate tag="option" value="\" say="Backslash"/>
                        </select>
                    </div>
                    <div class="passwords-import-option-row">
                        <input type="checkbox"
                               id="passwords-import-csv-badQuotes"
                               v-model="csv.badQuotes"
                               :disabled="importing"/>
                        <translate tag="label" for="passwords-import-csv-badQuotes" say="Detect unescaped quotes"/>
                    </div>
                </div>
                <input type="file"
                       :accept="mime"
                       @change="processFile($event)"
                       id="passwords-import-file"
                       :disabled="importing">
            </div>
        </div>

        <div class="step-3" v-if="step > 2">
            <translate tag="h1" say="Select Options"/>
            <div class="step-content">
                <div>
                    <translate tag="label" for="passwords-import-mode" say="Conflict handling"/>
                    <select id="passwords-import-mode" v-model="options.mode" :disabled="importing">
                        <translate tag="option" value="0" say="Skip if same revision"/>
                        <translate tag="option" value="1" say="Skip always"/>
                        <translate tag="option" value="2" say="Overwrite existing"/>
                        <translate tag="option" value="3" say="Merge with existing"/>
                        <translate tag="option" value="4" say="Create new entry"/>
                    </select>
                    <div v-if="source === 'json'">
                        <translate tag="label"
                                   for="passwords-import-encrypt"
                                   say="Backup password"
                                   title="For encrypted backups"/>
                        <input ref="backupEncrypt"
                               type="password"
                               id="passwords-import-encrypt"
                               minlength="10"
                               :title="backupPasswordTitle"
                               v-model="options.password"
                               :disabled="importing"
                               autocomplete="new-password"
                               readonly/>
                    </div>
                    <br>
                    <div v-if="source === 'enpass'">
                        <br>
                        <input type="checkbox"
                               id="passwords-enpass-empty"
                               v-model="options.skipEmpty"
                               :disabled="importing"/>
                        <translate tag="label" for="passwords-enpass-empty" say="Don't import empty fields"/>
                    </div>
                    <div v-if="source === 'csv'">
                        <translate tag="h3" say="Import Options"/>
                        <translate tag="label" for="passwords-import-csv-db" say="Database"/>
                        <select id="passwords-import-csv-db" v-model="options.db" :disabled="importing">
                            <translate tag="option" value="passwords" say="Passwords"/>
                            <translate tag="option" value="folders" say="Folders"/>
                            <translate tag="option" value="tags" say="Tags"/>
                        </select>
                        <br>
                        <br>
                        <div class="passwords-import-option-row">
                            <input type="checkbox"
                                   id="passwords-import-csv-skip"
                                   v-model="options.firstLine"
                                   :disabled="importing"/>
                            <translate tag="label" for="passwords-import-csv-skip" say="Skip first line"/>
                        </div>
                        <div class="passwords-import-option-row">
                            <input type="checkbox"
                                   id="passwords-import-csv-repair"
                                   v-model="options.repair"
                                   :disabled="importing"/>
                            <translate tag="label" for="passwords-import-csv-repair" say="Interpolate missing fields"/>
                        </div>
                        <div class="passwords-import-option-row">
                            <input type="checkbox"
                                   id="passwords-import-csv-shared"
                                   v-model="options.skipShared"
                                   :disabled="importing"
                                   v-if="options.mode !== '4' && options.db === 'passwords'"/>
                            <translate tag="label"
                                       for="passwords-import-csv-shared"
                                       say="Don't edit passwords shared with me"
                                       v-if="options.mode !== '4' && options.db === 'passwords'"/>
                        </div>
                        <br>

                        <translate tag="h3" say="CSV Field Mapping"/>
                        <translate tag="label" for="passwords-import-csv-preview-line" say="Preview Line"/>
                        <select id="passwords-import-csv-preview-line" v-model="previewLine" :disabled="importing">
                            <translate tag="option"
                                       v-for="index in 10"
                                       :value="index.toString()"
                                       say="Line {line}"
                                       :variables="{line:index}"
                                       :key="index"/>
                        </select>
                        <div class="csv-mapping">
                            <div v-for="(value, id) in csvSampleData"
                                 class="csv-mapping-field"
                                 :key="id"
                                 :data-value="value"
                                 :data-id="id">
                                <div class="value" v-if="value">{{ value }}</div>
                                <translate tag="div" class="value" say="(no value)" v-else/>
                                <select @change="csvFieldMapping($event, id)"
                                        :id="`passwords-mapping-${id}`"
                                        :disabled="importing">
                                    <translate tag="option" value="null" say="Ignore"/>
                                    <translate tag="option"
                                               v-for="(label, option) in csvFieldOptions(id)"
                                               :value="option"
                                               :say="label"
                                               :key="option"/>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <br v-if="source !== 'enpass'">
                        <input type="checkbox"
                               id="passwords-import-shared"
                               v-model="options.skipShared"
                               :disabled="importing"
                               v-if="options.mode !== '4'"/>
                        <translate tag="label"
                                   for="passwords-import-shared"
                                   say="Don't edit passwords shared with me"
                                   v-if="options.mode !== '4'"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="step-4" v-if="step > 3">
            <translate tag="h1" say="Run Import"/>
            <div class="step-content">
                <translate tag="button"
                           @click="importDb"
                           say="Import"
                           v-if="progress.status === null"
                           id="passwords-import-execute"/>
                <div class="import-progress" v-else>
                    <progress :value="progress.processed"
                              :max="progress.total"
                              :title="progress.status"
                              :class="progress.style"></progress>
                    <translate :say="progress.status"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Translate from '@vc/Translate';
    import CustomCsvHelp from '@vue/Import/CustomCsvHelp';
    import MessageService from "@js/Services/MessageService";
    import LoggingService from "@js/Services/LoggingService";
    import LocalisationService from "@js/Services/LocalisationService";

    export default {
        components: {
            CustomCsvHelp,
            Translate
        },

        data() {
            return {
                source     : '',
                type       : 'json',
                mime       : 'application/json',
                fieldMap   : {
                    passwords: [
                        'password',
                        'username',
                        'label',
                        'notes',
                        'url',
                        'edited',
                        'favorite',
                        'folderLabel',
                        'tagLabels',
                        'customFields',
                        'folderId',
                        'tagIds',
                        'id',
                        'revision'
                    ],
                    folders  : ['label', 'edited', 'favorite', 'parentLabel', 'parentId', 'id', 'revision'],
                    tags     : ['label', 'color', 'edited', 'favorite', 'id', 'revision']
                },
                file       : null,
                fileMime   : '',
                csvFile    : null,
                csvReady   : false,
                csv        : {newLine: 'auto', delimiter: 'auto', quotes: '"', escape: '"', badQuotes: false, rowSize: -1, strictRows: false},
                options    : {mode: 0, skipShared: true, skipEmpty: false},
                step       : 1,
                previewLine: 1,
                importing  : false,

                progress: {
                    style    : '',
                    processed: 0,
                    total    : 0,
                    status   : null
                }
            };
        },

        computed: {
            csvSampleData() {
                let data = this.file;

                return data.length >= this.previewLine ? data[this.previewLine - 1]:data[data.length - 1];
            },
            backupPasswordTitle() {
                return LocalisationService.translate('For encrypted backups');
            }
        },

        methods: {
            preventPasswordFill(t = 300) {
                setTimeout(() => {
                    this.$refs.backupEncrypt.removeAttribute('readonly');
                }, t);
            },
            async importDb() {
                this.progress.style = '';
                this.importing = true;

                try {
                    let module = await import(/* webpackChunkName: "ImportManager" */ '@js/Manager/ImportManager');
                    new module.ImportManager()
                        .importDatabase(this.file, this.type, this.options, this.registerProgress)
                        .catch((e) => {
                            console.error(e);
                            this.importing = false;
                            this.progress.style = 'error';
                            this.progress.status = 'Import failed';
                            MessageService.alert(e.message, 'Import error');
                        })
                        .then((errors = []) => {
                            this.importing = false;
                            if(this.progress.style !== 'error' && !errors.length) {
                                this.progress.style = 'success';
                                this.progress.status = 'Import successful';
                            } else if(errors.length) {
                                this.progress.style = 'warn';
                                this.progress.status = 'Import partially failed';
                                let message = LocalisationService.translate('Some objects had errors:')
                                              + ' ' + errors.join(' ') + ' ' +
                                              LocalisationService.translate('More information can be found in the log. (Press F12)');
                                MessageService.alert(message, 'Import error');
                            }
                        });
                } catch(e) {
                    MessageService.alert(['Unable to load {module}', {module: 'ImportManager'}], 'Network error');
                }
            },
            processFile(event) {
                let file = event.target.files[0];
                this.fileMime = file.type;

                if(this.mime === 'text/csv') {
                    this.readCsv(file);
                } else {
                    let reader = new FileReader();
                    reader.onload = (e) => { this.file = e.target.result; };
                    reader.readAsText(file);
                }
            },
            async readCsv(file) {
                this.csvReady = false;
                this.csvFile = file;
                this.file = file;
                let Parser;

                try {
                    Parser = await import(/* webpackChunkName: "CsvHero" */ 'csv-hero');
                } catch(e) {
                    LoggingService.error(e);
                    MessageService.alert(['Unable to load {module}', {module: 'CsvHero'}], 'Network error');
                }

                try {
                    let result = await Parser.default.parse(file, {
                        newLine           : this.csv.newLine,
                        delimiter         : this.csv.delimiter,
                        quotes            : this.csv.quotes,
                        escape            : this.csv.escape,
                        strictSpaces      : false,
                        strictRows        : this.csv.strictRows,
                        strictQuotes      : !this.csv.badQuotes,
                        rowSize           : this.csv.rowSize,
                        skipEmptyRows     : true,
                        skipEmptyFieldRows: true,
                        trimFields        : true
                    });

                    this.csvParseComplete(result);
                } catch(e) {
                    this.csvParseComplete(e);
                }

            },
            csvParseComplete(result) {
                if(result.errors.length === 0) {
                    this.file = result.data;
                    this.csvReady = true;
                } else {
                    document.getElementById('passwords-import-file').value = null;
                    this.csvFile = null;
                    this.file = null;
                    let errors = [];
                    for(let i = 0; i < result.errors.length; i++) {
                        let error   = result.errors[i],
                            message = LocalisationService.translate(error.message);

                        errors.push(
                            LocalisationService.translate(
                                '{message} in line {line} character {character}.',
                                {
                                    message,
                                    line     : error.line,
                                    character: error.character
                                })
                        );
                    }
                    LoggingService.error(result.errors);
                    MessageService.alert(
                        ['The file could not be parsed: {errors}', {errors: errors.join(' ')}],
                        'Import error'
                    );
                }
            },
            registerProgress(processed, total, status) {
                this.progress.processed = processed;
                this.progress.total = total;
                if(status !== null) this.progress.status = status;
            },
            csvFieldOptions(current) {
                let fields  = this.fieldMap[this.options.db],
                    options = {};

                for(let i = 0; i < fields.length; i++) {
                    let field = fields[i],
                        index = this.options.mapping.indexOf(field);

                    if(index === -1 || index === current) {
                        options[field] = field.capitalize();
                    }
                }

                return options;
            },
            csvFieldMapping(event, id) {
                let mapping = this.options.mapping.clone(),
                    value   = event.target.value;

                if(value === 'null') value = null;
                mapping[id] = value;
                this.options.mapping = mapping;
            },
            setNewLine(e) {
                let value   = e.target.value,
                    mapping = {n: '\n', r: '\r', rn: '\r\n'};

                if(!mapping.hasOwnProperty(value)) {
                    this.csv.newLine = 'auto';
                } else {
                    this.csv.newLine = mapping[value];
                }
            },
            validateStep() {
                this.progress.status = null;
                if(this.file === null) {
                    this.step = 2;
                } else if(this.source === 'csv') {
                    if(
                        (this.options.db === 'passwords' && this.options.mapping.indexOf('password') !== -1) ||
                        (`${this.options.mode}` === '3' && this.options.mapping.length > 0 && !this.options.mapping.isNull()) ||
                        this.options.mapping.indexOf('label') !== -1
                    ) {
                        this.step = this.csvReady ? 4:2;
                    } else if(this.csvReady) {
                        this.step = 3;
                    } else {
                        this.step = 2;
                    }
                } else if(this.source === 'json') {
                    this.preventPasswordFill();
                    this.step = 4;
                } else if(this.mime === 'text/csv' && !this.csvReady) {
                    this.step = 2;
                } else {
                    this.step = 4;
                }
            }
        },

        watch: {
            source(value) {
                let oldMime = this.mime;
                this.progress.status = null;
                this.csv.badQuotes = false;
                this.csv.newLine = 'auto';
                this.options.mode = 3;
                this.mime = 'text/csv';
                this.type = 'csv';

                // noinspection FallThroughInSwitchStatementJS
                switch(value) {
                    case 'json':
                        this.options.mode = 0;
                        this.mime = 'application/json';
                        this.type = 'json';
                        break;
                    case 'pmanJson':
                        this.mime = 'application/json';
                        this.type = 'pmanJson';
                        break;
                    case 'enpass':
                        this.mime = 'application/json';
                        this.options.skipEmpty = true;
                        this.type = 'enpass';
                        break;
                    case 'bitwarden':
                        this.mime = 'application/json';
                        this.type = 'bitwarden';
                        break;
                    case 'keepass':
                        this.csv.escape = '\\';
                    case 'legacy':
                    case 'chrome':
                    case 'firefox':
                    case 'roboform':
                    case 'lastpass':
                    case 'bitwardenCsv':
                        this.options.profile = value;
                        break;
                    case 'safeincloud':
                        this.csv.newLine = '\r\n';
                        this.options.profile = value;
                        break;
                    case 'pmanCsv':
                        this.type = 'pmanCsv';
                    case 'dashlane':
                        this.options.profile = value;
                        this.csv.strictRows = true;
                        this.csv.rowSize = 9;
                        break;
                    case 'pwdCsv':
                        this.options.profile = 'passwords';
                        this.options.mode = 2;
                        break;
                    case 'fldCsv':
                        this.options.profile = 'folders';
                        this.options.mode = 2;
                        break;
                    case 'tagCsv':
                        this.options.profile = 'tags';
                        this.options.mode = 2;
                        break;
                    case 'csv':
                        this.options =
                            {
                                mode      : 3,
                                skipShared: true,
                                firstLine : 1,
                                delimiter : 'auto',
                                db        : 'passwords',
                                mapping   : [],
                                repair    : true,
                                profile   : 'custom'
                            };
                        break;
                }

                if(oldMime !== this.mime && this.file) {
                    document.getElementById('passwords-import-file').value = null;
                    this.fileMime = '';
                    this.csvFile = null;
                    this.file = null;
                }
                this.validateStep();
            },
            file() {
                this.validateStep();
            },
            options: {
                handler() {
                    this.validateStep();
                },
                deep: true
            },
            csv    : {
                handler() {
                    if(this.csvFile) this.readCsv(this.csvFile);
                },
                deep: true
            },
            'options.db'() {
                document.querySelectorAll('.csv-mapping-field select').forEach((e) => { e.value = null;});
                if(this.source === 'csv') this.options.mapping = [];
                this.validateStep();
            }
        }
    };
</script>

<style lang="scss">
.import-container {
    .step-2,
    .step-3 {
        .step-content {
            .file.warning {
                margin : 3px 0 !important;
            }

            label {
                margin-right : 5px;
                min-width    : 105px;
                display      : inline-block;
            }

            label[for=passwords-import-csv-preview-line] {
                padding-left : 5px;
            }

            .no-options {
                margin : 10px;
                color  : $color-grey-darker;
            }

            .passwords-import-option-row {
                min-height: 36px;

                input[type="checkbox"] {
                    margin: 0 3px 0 0 !important;
                }
            }
        }
    }

    .import-progress {
        position : relative;

        progress {
            width              : 100%;
            height             : 34px;
            border-radius      : var(--border-radius);
            border             : none;
            -webkit-appearance : none;
            background-color   : $color-grey-lighter;

            &::-moz-progress-bar {
                background-color : var(--color-primary);
                border-radius    : var(--border-radius);
                transition       : background-color 0.25s ease-in-out;
            }

            &::-webkit-progress-value {
                background-color : var(--color-primary);
                border-radius    : var(--border-radius);
                transition       : background-color 0.25s ease-in-out;
            }

            &.success {
                &::-moz-progress-bar {
                    background-color : var(--color-success);
                }

                &::-webkit-progress-value {
                    background-color : var(--color-success);
                }
            }

            &.warn {
                &::-moz-progress-bar {
                    background-color : var(--color-warning);
                }

                &::-webkit-progress-value {
                    background-color : var(--color-warning);
                }
            }

            &.error {
                &::-moz-progress-bar {
                    background-color : var(--color-error)
                }

                &::-webkit-progress-value {
                    background-color : var(--color-error)
                }
            }
        }

        span {
            position    : absolute;
            left        : 5px;
            top         : 0;
            line-height : 32px;
            font-size   : 1.2em;
            color       : $color-black-light;
        }
    }

    @media(max-width : $width-extra-small) {
        .csv-mapping-field .value {
            padding     : 1em 0 .25em;
            font-weight : bold;
        }
    }
}
</style>