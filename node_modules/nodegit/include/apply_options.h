// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITAPPLYOPTIONS_H
#define GITAPPLYOPTIONS_H
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

  #include "../include/diff_delta.h"
  #include "../include/diff_hunk.h"
 
using namespace node;
using namespace v8;

class GitApplyOptions;

struct GitApplyOptionsTraits {
  typedef GitApplyOptions cppClass;
  typedef git_apply_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_apply_options **dest, git_apply_options *src) {
     Nan::ThrowError("duplicate called on GitApplyOptions which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = false;
  static void free(git_apply_options *raw) {
     Nan::ThrowError("free called on GitApplyOptions which cannot be freed");
   }
};
 class GitApplyOptions : public NodeGitWrapper<GitApplyOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitApplyOptionsTraits>;
  public:
    GitApplyOptions(git_apply_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

            static int delta_cb_cppCallback (
              const git_diff_delta * delta
                ,
               void * payload
            );

          static void delta_cb_async(void *baton);
          static void delta_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct DeltaCbBaton : public AsyncBatonWithResult<int> {
                const git_diff_delta * delta;
                void * payload;
 
              DeltaCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitApplyOptions * delta_cb_getInstanceFromBaton (
            DeltaCbBaton *baton);
            static int hunk_cb_cppCallback (
              const git_diff_hunk * hunk
                ,
               void * payload
            );

          static void hunk_cb_async(void *baton);
          static void hunk_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct HunkCbBaton : public AsyncBatonWithResult<int> {
                const git_diff_hunk * hunk;
                void * payload;
 
              HunkCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitApplyOptions * hunk_cb_getInstanceFromBaton (
            HunkCbBaton *baton);
     
  private:
    GitApplyOptions();
    ~GitApplyOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

             CallbackWrapper delta_cb;
  
        static NAN_GETTER(GetDeltaCb);
        static NAN_SETTER(SetDeltaCb);

             CallbackWrapper hunk_cb;
  
        static NAN_GETTER(GetHunkCb);
        static NAN_SETTER(SetHunkCb);

             Nan::Persistent<Value> payload;
  
        static NAN_GETTER(GetPayload);
        static NAN_SETTER(SetPayload);

  };

#endif
