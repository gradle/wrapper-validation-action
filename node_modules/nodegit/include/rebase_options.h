// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITREBASEOPTIONS_H
#define GITREBASEOPTIONS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "reference_counter.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

  #include "../include/checkout_options.h"
  #include "../include/merge_options.h"
  #include "../include/buf.h"
 
using namespace node;
using namespace v8;

class GitRebaseOptions;

struct GitRebaseOptionsTraits {
  typedef GitRebaseOptions cppClass;
  typedef git_rebase_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_rebase_options **dest, git_rebase_options *src) {
     Nan::ThrowError("duplicate called on GitRebaseOptions which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_rebase_options *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};
 class GitRebaseOptions : public NodeGitWrapper<GitRebaseOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitRebaseOptionsTraits>;
  public:
    GitRebaseOptions(git_rebase_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                    static int signing_cb_cppCallback (
              git_buf * signature
                ,
               git_buf * signature_field
                ,
               const char * commit_content
                ,
               void * payload
            );

          static void signing_cb_async(void *baton);
          static void signing_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct SigningCbBaton : public AsyncBatonWithResult<int> {
                git_buf * signature;
                git_buf * signature_field;
                const char * commit_content;
                void * payload;
 
              SigningCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitRebaseOptions * signing_cb_getInstanceFromBaton (
            SigningCbBaton *baton);
       
  private:
    GitRebaseOptions();
    ~GitRebaseOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetQuiet);
        static NAN_SETTER(SetQuiet);

   
        static NAN_GETTER(GetRewriteNotesRef);
        static NAN_SETTER(SetRewriteNotesRef);

             Nan::Persistent<Object> checkout_options;
  
        static NAN_GETTER(GetCheckoutOptions);
        static NAN_SETTER(SetCheckoutOptions);

             Nan::Persistent<Object> merge_options;
  
        static NAN_GETTER(GetMergeOptions);
        static NAN_SETTER(SetMergeOptions);

             CallbackWrapper signing_cb;
  
        static NAN_GETTER(GetSigningCb);
        static NAN_SETTER(SetSigningCb);

             Nan::Persistent<Value> payload;
  
        static NAN_GETTER(GetPayload);
        static NAN_SETTER(SetPayload);

   
        static NAN_GETTER(GetInmemory);
        static NAN_SETTER(SetInmemory);

  };

#endif
