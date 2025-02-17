<template>
  <q-page class="flex-center column full-width">
    <div class="flex-center column align-items-center">
      <template v-if="packs === null">
        <q-spinner
          color="primary"
          size="3em"
          class="q-mb-md"
        ></q-spinner>
        <p>Loading Asset Packs...</p>
      </template>
      <h5 v-else-if="packs.length < 1">Nothing to see here 🤔</h5>
      <div v-else class="flex column nowrap">

        <div class="flex justify-center q-gutter-sm">
          <q-input bottom-slots v-model="search" placeholder="Search" dense dark borderless style="width: 200px">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>

            <template v-slot:append>
              <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
            </template>
          </q-input>

          <q-select
            v-model="sorting"
            :options="sortOptions"
            style="width: 142px; border-radius: 14px; border-width: 2px;"
            popup-content-style="width: 142px; height: auto; max-height: 320px; border-radius: 14px; border: 2px solid white;"
            popup-content-class="bg-black text-gray-3"
            options-selected-class="bg-black text-white"
            behavior="menu"
            options-dense
            borderless
            dense
            dark
          />
        </div>

        <q-list class="packs-grid grow">
          <q-card
            v-for="pack in packsModel"
            :key="pack.id"
            v-bind="pack"
            class="flex justify-between"
            style="flex-direction: column;"
            dark
          >
            <q-carousel
              animated
              v-model="slides[pack.id]"
              :arrows="pack.preview_urls.length > 1"
              :navigation="pack.preview_urls.length > 1"
              transition-prev="slide-right"
              transition-next="slide-left"
              infinite
            >
              <q-carousel-slide
                v-for="(preview_url, i) in pack.preview_urls"
                :key="i"
                :name="i + 1"
                :img-src="preview_url"
              />
            </q-carousel>

            <div class="q-mt-xs q-ml-md q-mr-sm flex items-center justify-between" style="flex-wrap: nowrap;">
              <div class="text-left text-bold col-grow">
                <div class="text-h5 flex justify-between">
                  {{ pack.name }}
                  <q-btn
                    v-if="pack.source_url"
                    :href="pack.source_url"
                    target="_blank"
                    icon="open_in_new"
                    class="flat-btn"
                    style="padding: 0; margin-right: 5px;"
                    flat
                  />
                </div>

                <div class="text-h7 q-mr-sm flex justify-between">
                  by {{ pack.author }}
                  <span>
                    <q-icon v-if="pack.stats.packs > 1" size="1.3em" style="margin-left: 5px" name="category">
                      <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                        Contains {{ pack.stats.packs }} Asset Packs
                      </q-tooltip>
                    </q-icon>
                    <q-icon v-if="pack.stats.anims > 0" size="1.3em" style="margin-left: 5px" name="ondemand_video">
                      <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                        {{ pack.stats.anims }} Animation{{ pack.stats.anims > 1 ? "s" : "" }}
                      </q-tooltip>
                    </q-icon>
                    <q-icon v-if="pack.stats.passport.length > 0" size="1.3em" style="margin-left: 5px" name="portrait">
                      <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                        {{ !pack.stats.passport.includes("Background") ? "" : "Passport Background" + (pack.stats.passport.length > 1 ? ` and ${pack.stats.passport.slice(1).join(", ")} Mood${pack.stats.passport.length > 2 ? "s" : ""}` : "") }}
                        {{ pack.stats.passport.includes("Background") ? "" : `${pack.stats.passport.join(", ")} Passport Mood${pack.stats.passport.length > 1 ? "s" : ""}` }}
                      </q-tooltip>
                    </q-icon>
                    <q-icon v-if="pack.stats.icons > 0" size="1.3em" style="margin-left: 5px" name="wallpaper">
                      <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                        {{ pack.stats.icons }} Icon{{ pack.stats.icons > 1 ? "s" : "" }}
                      </q-tooltip>
                    </q-icon>
                    <q-icon v-if="pack.stats.fonts.length > 0" size="1.3em" style="margin-left: 5px" name="text_fields">
                      <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                        {{ pack.stats.fonts.join(", ") }} Font{{ pack.stats.fonts.length > 1 ? "s" : "" }}
                      </q-tooltip>
                    </q-icon>
                  </span>
                </div>
              </div>
            </div>

            <div
              v-if="pack.description"
              class="q-mt-xs q-mx-md"
            >{{ pack.description }}</div>

            <div class="text-grey text-caption q-mx-md flex justify-between">
              <span>Last Updated: {{ pack.stats.updated.toISOString().split("T")[0] }}</span>
              <!-- <span>Added: {{ pack.stats.added.toISOString().split("T")[0] }}</span> -->
            </div>

            <q-card-actions :align="'stretch'">
              <q-btn
                :href="`${pack.zipFile.url}?sha256=${pack.zipFile.sha256}`"
                class="main-btn"
                style="flex: 1; padding: 5px;"
                flat
              >Download</q-btn>

              <div style="flex: 1; margin-left: 6px; display: flex; flex-wrap: wrap">
                <q-btn
                  v-if="flags.ableToExtract === false"
                  @click="updateFw()"
                  class="main-btn"
                  style="flex: 1; padding: 5px;"
                  flat
                >Update FW</q-btn>
                <q-btn
                  v-else-if="!queue.includes(pack)"
                  :disable="!serialSupported || rpcToggling || (connected && flags.ableToExtract === null)"
                  @click="enqueue(pack, 'install')"
                  :class="`main-btn ${installed[pack.id] && installed[pack.id].sha256 !== pack.tarFile.sha256 ? 'attention' : ''}`"
                  style="flex: 1; padding: 5px;"
                  flat
                >{{
                    !serialSupported ? 'Unsupported'
                      : rpcToggling ? 'Connecting'
                      : !connected ? 'Connect'
                      : flags.ableToExtract === null ? 'Loading'
                      : !installed[pack.id] ? 'Install'
                      : installed[pack.id].sha256 === pack.tarFile.sha256 ? 'Reflash'
                      : 'Update'
                }}</q-btn>
                <q-btn
                  v-else-if="queue.indexOf(pack) === 0"
                  class="main-btn"
                  :style="`flex: 1; padding: 5px; background-image: linear-gradient(to right, #a883e9 ${progress * 100}%, transparent ${progress * 100}%);`"
                  disable
                  flat
                >{{ installStatus }}</q-btn>
                <q-btn
                  v-else
                  class="main-btn"
                  style="flex: 1; padding: 5px;"
                  disable
                  flat
                >Queued</q-btn>

                <q-btn
                  v-if="installed[pack.id]"
                  @click="enqueue(pack, 'remove')"
                  class="main-btn negative"
                  style="flex: 0; padding: 5px; margin-left: 6px; overflow: visible;"
                  :disable="queue.includes(pack)"
                  flat
                  icon="delete_outline"
                ></q-btn>
              </div>
            </q-card-actions>

          </q-card>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fetchPacks } from '../util/util'
import { defineComponent, ref } from 'vue'
import asyncSleep from 'simple-async-sleep'
import semver from 'semver'

const ASSET_PACKS_DIR = '/ext/asset_packs'
const ASSET_PACKS_TEMP_PATH = '/ext/.tmp/mntm'
const ASSET_PACKS_MANIFESTS_DIR = `${ASSET_PACKS_DIR}/.manifests`
const ASSET_PACKS_MANIFESTS_EXT = '.pack'

export default defineComponent({
  name: 'PagePacks',

  props: {
    flipper: Object,
    connected: Boolean,
    rpcActive: Boolean,
    rpcToggling: Boolean,
    serialSupported: Boolean,
    info: Object
  },

  computed: {
    packsModel () {
      if (!this.packs) return []
      const packs = this.packs
      let sortFn = null
      switch (this.sorting) {
        case 'Alphabetic':
          sortFn = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          break
        case 'New Updates':
          sortFn = (a, b) => a.stats.updated < b.stats.updated ? 1 : -1
          break
        case 'Old Updates':
          sortFn = (a, b) => a.stats.updated > b.stats.updated ? 1 : -1
          break
        case 'New Packs':
          sortFn = (a, b) => a.stats.added < b.stats.added ? 1 : -1
          break
        case 'Old Packs':
          sortFn = (a, b) => a.stats.added > b.stats.added ? 1 : -1
          break
      }
      return packs.sort(sortFn).filter((pack) => {
        for (const text of [pack.name, pack.author, pack.description]) {
          if (text.toLowerCase().includes(this.search.toLowerCase())) return true
        }
        return false
      })
    }
  },

  setup () {
    return {
      packs: ref(null),
      installed: ref({}),
      slides: ref({}),
      search: ref(''),
      sorting: ref('New Updates'),
      sortOptions: ref([
        'Alphabetic',
        'New Updates',
        'New Packs',
        'Old Updates',
        'Old Packs'
      ]),
      flags: ref({
        restarting: false,
        rpcActive: false,
        rpcToggling: false,
        ableToExtract: null
      }),
      progress: ref(0),
      installStatus: ref(null),
      queue: ref([]),
      queueActions: ref([]),
      fakeExtractProgress: ref(null)
    }
  },

  watch: {
    async info (newInfo, oldInfo) {
      if (newInfo !== null && newInfo.storage_databases_present && this.connected) {
        await this.start()
      }
    }
  },

  methods: {
    async updateFw () {
      window.top.location.href = '/update'
    },

    async enqueue (pack, action) {
      if (!this.serialSupported) return
      if (!this.connected || this.info == null || !this.rpcActive) {
        if (!this.rpcToggling) this.$emit('selectPort')
        return
      }
      // I dont like this
      this.queue.push(pack)
      this.queueActions.push(action)
      if (this.queue.length > 1) {
        return
      }
      while (this.queue.length > 0) {
        try {
          const stepCount = 3
          let step = -1
          const setProgress = (progress) => {
            this.progress = (progress / stepCount) + (1 / stepCount * step)
          }
          this.progress = 0

          this.installStatus = 'Loading'
          step++
          pack = this.queue[0]
          action = this.queueActions[0]
          const manifestPath = `${ASSET_PACKS_MANIFESTS_DIR}/${pack.id}${ASSET_PACKS_MANIFESTS_EXT}`

          const removeOldPacks = async () => {
            const installed = this.installed[pack.id]
            if (!installed) return
            for (const folder of installed.folders) {
              const packFolder = `${ASSET_PACKS_DIR}/${folder}`
              await this.flipper.commands.storage.remove(packFolder, true)
                .catch(error => this.rpcErrorHandler(error, 'storage.remove'))
                .finally(() => {
                  this.$emit('log', {
                    level: 'debug',
                    message: `Packs: storage.remove: ${packFolder}`
                  })
                })
            }
            await this.flipper.commands.storage.remove(manifestPath, false)
              .catch(error => this.rpcErrorHandler(error, 'storage.remove'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: `Packs: storage.remove: ${manifestPath}`
                })
              })
          }
          if (action === 'remove') {
            this.installStatus = 'Deleting'
            await removeOldPacks()
            delete this.installed[pack.id]
            continue
          }

          if (action !== 'install') {
            continue
          }
          let removeOldPacksTask = null
          const packFile = pack.tarFile
          const packUrl = `${packFile.url}?sha256=${packFile.sha256}`
          const packTar = await fetch(packUrl)
            .then(async response => {
              if (response.status >= 400) {
                throw new Error('Pack returned ' + response.status)
              }
              // Start removing previous packs in background, but only if request succeeded
              removeOldPacksTask = removeOldPacks()
              // Read in chunks
              const totalLength = Number(response.headers.get('content-length'))
              const reader = response.body.getReader()
              let receivedLength = 0
              const chunks = []
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                chunks.push(value)
                receivedLength += value.length
                // Update progress
                setProgress(receivedLength / totalLength)
              }
              // Piece together the chunks into one array
              const chunksAll = new Uint8Array(receivedLength)
              let position = 0
              for (const chunk of chunks) {
                chunksAll.set(chunk, position)
                position += chunk.length
              }
              return chunksAll
            })
            .catch(error => {
              this.$emit('showNotif', {
                message: 'Failed to fetch pack: ' + error.toString(),
                color: 'negative'
              })
              this.$emit('log', {
                level: 'error',
                message: 'Packs: Failed to fetch pack: ' + error.toString()
              })
              throw error
            })
            .finally(() => {
              this.$emit('log', {
                level: 'debug',
                message: 'Packs: Downloaded pack from ' + packUrl
              })
            })
          // Wait for removal to complete if download was hyperfast
          this.installStatus = 'Cleanup'
          await removeOldPacksTask

          const mkdirParents = async (path) => {
            if (path.endsWith('/')) {
              path = path.slice(0, -1)
            }
            let full = ''
            for (const segment of path.split('/')) {
              if (full !== '/') {
                full += '/'
              }
              full += segment
              if (full.length < '/ext/*'.length) {
                continue // Cannot mkdir filesystems root, needs to be atleast fs root + 1 char
              }
              await this.flipper.commands.storage.mkdir(full)
                .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
                .finally(() => {
                  this.$emit('log', {
                    level: 'debug',
                    message: 'Packs: storage.mkdir: ' + full
                  })
                })
            }
          }

          await mkdirParents(ASSET_PACKS_MANIFESTS_DIR)
          await mkdirParents(ASSET_PACKS_TEMP_PATH)
          const tempFile = `${ASSET_PACKS_TEMP_PATH}/${pack.id}.tar.gz`

          this.installStatus = 'Copying'
          step++
          const unbind = this.flipper.emitter.on('storageWriteRequest/progress', e => {
            setProgress(e.progress / e.total)
          })
          let start = performance.now()
          let took = 0
          await this.flipper.commands.storage.write(tempFile, packTar)
            .catch(error => {
              this.rpcErrorHandler(error, 'storage.write')
              throw error
            })
            .finally(() => {
              took = performance.now() - start
              this.$emit('log', {
                level: 'debug',
                message: `Packs: storage.write: ${tempFile} took ${Math.round(took)}ms`
              })
            })
          unbind()

          this.installStatus = 'Extract'
          step++
          start = performance.now()
          // Lord forgive me for I have sinned
          const expectedExtractTime = took * 10 // Depends on compression ratio and sd speed, 10x is generous
          this.fakeExtractProgress = setInterval(() => {
            setProgress((performance.now() - start) / expectedExtractTime)
          }, 250)
          await this.flipper.commands.storage.tarExtract(tempFile, ASSET_PACKS_DIR)
            .catch(error => {
              this.rpcErrorHandler(error, 'storage.tarExtract')
              throw error
            })
            .finally(() => {
              if (this.fakeExtractProgress !== null) {
                clearInterval(this.fakeExtractProgress)
                this.fakeExtractProgress = null
              }
              took = performance.now() - start
              this.$emit('log', {
                level: 'debug',
                message: `Packs: storage.tarExtract: ${tempFile} to ${ASSET_PACKS_DIR} took ${Math.round(took)}ms`
              })
            })
          setProgress(1)

          this.installStatus = 'Cleanup'
          await this.flipper.commands.storage.remove(tempFile, false)
            .catch(error => this.rpcErrorHandler(error, 'storage.remove'))
            .finally(() => {
              this.$emit('log', {
                level: 'debug',
                message: 'Packs: storage.remove: ' + tempFile
              })
            })
          const manifest = {
            sha256: packFile.sha256,
            folders: pack.stats.folders
          }
          const manifestData = new TextEncoder().encode(JSON.stringify(manifest))
          await this.flipper.commands.storage.write(manifestPath, manifestData)
            .catch(error => {
              this.rpcErrorHandler(error, 'storage.write')
              throw error
            })
            .finally(() => {
              this.$emit('log', {
                level: 'debug',
                message: `Packs: storage.write: ${manifestPath}`
              })
            })
          this.installed[pack.id] = manifest
        } finally {
          this.queue.shift()
          this.queueActions.shift()
          this.installStatus = null
          this.progress = 0
        }
      }
    },

    async loadPackManifest (path) {
      try {
        const raw = await this.flipper.commands.storage.read(path)
          .catch(error => {
            this.rpcErrorHandler(error, 'storage.read')
            throw error
          })
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: `Packs: storage.read: ${path}`
            })
          })
        const text = new TextDecoder().decode(raw)
        const json = JSON.parse(text)
        if (!json.sha256 || !Array.isArray(json.folders)) return null
        return {
          sha256: json.sha256,
          folders: json.folders
        }
      } catch (e) {
        console.log(e)
        return null
      }
    },

    async loadInstalledPacks () {
      const installed = {}
      try {
        const manifests = await this.flipper.commands.storage.list(ASSET_PACKS_MANIFESTS_DIR)
          .catch(error => {
            if (error === 'ERROR_STORAGE_NOT_EXIST') {
              return []
            }
            this.rpcErrorHandler(error, 'storage.list')
            throw error
          })
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: `Packs: storage.list: ${ASSET_PACKS_MANIFESTS_DIR}`
            })
          })
        for (const manifest of manifests) {
          if (manifest.type === 1 || !manifest.size) continue
          if (!manifest.name.endsWith(ASSET_PACKS_MANIFESTS_EXT)) continue
          const packId = manifest.name.slice(0, -ASSET_PACKS_MANIFESTS_EXT.length)
          for (const pack of this.packs) {
            if (pack.id === packId) {
              const manifestData = await this.loadPackManifest(`${ASSET_PACKS_MANIFESTS_DIR}/${manifest.name}`)
              if (manifestData) installed[packId] = manifestData
              break
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
      console.log(installed)
      this.installed = installed
    },

    async startRpc () {
      this.flags.rpcToggling = true
      const ping = await this.flipper.commands.startRpcSession(this.flipper)
      if (!ping.resolved || ping.error) {
        this.$emit('showNotif', {
          message: 'Unable to start RPC session. Reload the page or reconnect Flipper manually.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Device: Couldn\'t start rpc session'
        })
        throw new Error('Couldn\'t start rpc session')
      }
      this.flags.rpcActive = true
      this.flags.rpcToggling = false
      this.$emit('setRpcStatus', true)
      this.$emit('log', {
        level: 'info',
        message: 'Device: RPC started'
      })
    },

    async stopRpc () {
      this.flags.rpcToggling = true
      await this.flipper.commands.stopRpcSession()
      this.flags.rpcActive = false
      this.flags.rpcToggling = false
      this.$emit('setRpcStatus', false)
      this.$emit('log', {
        level: 'info',
        message: 'Device: RPC stopped'
      })
    },

    async restartRpc (force) {
      if ((this.connected && this.flags.rpcActive && !this.flags.restarting) || force) {
        this.flags.restarting = true
        await this.flipper.closeReader()
        await asyncSleep(300)
        await this.flipper.disconnect()
        await asyncSleep(300)
        await this.flipper.connect()
        await this.startRpc()
        this.$emit('log', {
          level: 'info',
          message: 'Device: Restarted RPC'
        })
      }
    },

    passNotif (config) {
      this.$emit('showNotif', config)
    },
    passLog (config) {
      this.$emit('log', config)
    },

    rpcErrorHandler (error, command) {
      error = error.toString()
      this.$emit('showNotif', {
        message: `RPC error in command '${command}': ${error}`,
        color: 'negative'
      })
      this.$emit('log', {
        level: 'error',
        message: `Device: RPC error in command '${command}': ${error}`
      })
    },

    async start () {
      if (!this.serialSupported) return
      this.flags.rpcActive = this.rpcActive
      await this.loadInstalledPacks()
      this.flags.ableToExtract = !semver.lt((this.info.protobuf_version_major + '.' + this.info.protobuf_version_minor) + '.0', '0.23.0')
      if (!this.rpcActive) {
        setTimeout(() => {
          if (!this.rpcActive) {
            return this.restartRpc(true)
          }
        }, 1000)
        await this.startRpc()
      }
    }
  },

  async mounted () {
    const packs = await fetchPacks()
      .catch(error => {
        this.$emit('showNotif', {
          message: 'Unable to load asset packs from the server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Packs: Failed to fetch pack list'
        })
        throw error
      })
    for (const pack of packs) {
      this.slides[pack.id] = 1
    }
    this.packs = packs
    if (this.connected && this.info !== null && this.info.storage_databases_present) {
      await this.start()
    }
    navigator.serial.addEventListener('disconnect', e => {
      if (this.fakeExtractProgress !== null) {
        clearInterval(this.fakeExtractProgress)
        this.fakeExtractProgress = null
      }
      this.flags.ableToExtract = null
      this.flags.rpcActive = false
      this.flags.rpcToggling = false
      this.installed = {}
      this.$emit('setRpcStatus', false)
    })
  },

  async beforeUnmount () {
  }
})
</script>
