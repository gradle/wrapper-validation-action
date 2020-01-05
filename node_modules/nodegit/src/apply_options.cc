// This is a generated file, modify: generate/templates/templates/struct_content.cc

#include <nan.h>
#include <string.h>
#ifdef WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif // win32

extern "C" {
  #include <git2.h>
 }

#include <iostream>
#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/apply_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/diff_delta.h"
  #include "../include/diff_hunk.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitApplyOptions::GitApplyOptions() : NodeGitWrapper<GitApplyOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_apply_options wrappedValue = GIT_APPLY_OPTIONS_INIT;
      this->raw = (git_apply_options*) malloc(sizeof(git_apply_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_apply_options));
  
  this->ConstructFields();
}

GitApplyOptions::GitApplyOptions(git_apply_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitApplyOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitApplyOptions::~GitApplyOptions() {
             if (this->delta_cb.HasCallback()) {
               this->raw->payload = NULL;
           }
             if (this->hunk_cb.HasCallback()) {
               this->raw->payload = NULL;
           }
       }

void GitApplyOptions::ConstructFields() {
   
          // Set the static method call and set the payload for this function to be
          // the current instance
          this->raw->delta_cb = NULL;
             this->raw->payload = (void *)this;
    
          // Set the static method call and set the payload for this function to be
          // the current instance
          this->raw->hunk_cb = NULL;
             this->raw->payload = (void *)this;
    
          v8::Local<Value> payload = Nan::Undefined();
          this->payload.Reset(payload);
    }

void GitApplyOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("ApplyOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("deltaCb").ToLocalChecked(), GetDeltaCb, SetDeltaCb);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("hunkCb").ToLocalChecked(), GetHunkCb, SetHunkCb);
     
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("ApplyOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitApplyOptions::GetVersion) {

      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitApplyOptions::SetVersion) {
      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitApplyOptions::GetDeltaCb) {

      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        if (wrapper->delta_cb.HasCallback()) {
          info.GetReturnValue().Set(wrapper->delta_cb.GetCallback()->GetFunction());
        } else {
          info.GetReturnValue().SetUndefined();
        }

     }

    NAN_SETTER(GitApplyOptions::SetDeltaCb) {
      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        Nan::Callback *callback = NULL;
        int throttle = 0;
        bool waitForResult = true;

        if (value->IsFunction()) {
          callback = new Nan::Callback(value.As<Function>());
        } else if (value->IsObject()) {
          v8::Local<Object> object = value.As<Object>();
          v8::Local<String> callbackKey;
          Nan::MaybeLocal<Value> maybeObjectCallback = Nan::Get(object, Nan::New("callback").ToLocalChecked());
          if (!maybeObjectCallback.IsEmpty()) {
            v8::Local<Value> objectCallback = maybeObjectCallback.ToLocalChecked();
            if (objectCallback->IsFunction()) {
              callback = new Nan::Callback(objectCallback.As<Function>());

              Nan::MaybeLocal<Value> maybeObjectThrottle = Nan::Get(object, Nan::New("throttle").ToLocalChecked());
              if(!maybeObjectThrottle.IsEmpty()) {
                v8::Local<Value> objectThrottle = maybeObjectThrottle.ToLocalChecked();
                if (objectThrottle->IsNumber()) {
                  throttle = (int)objectThrottle.As<Number>()->Value();
                }
              }

              Nan::MaybeLocal<Value> maybeObjectWaitForResult = Nan::Get(object, Nan::New("waitForResult").ToLocalChecked());
              if(!maybeObjectWaitForResult.IsEmpty()) {
                Local<Value> objectWaitForResult = maybeObjectWaitForResult.ToLocalChecked();
                waitForResult = Nan::To<bool>(objectWaitForResult).FromJust();
              }
            }
          }
        }
        if (callback) {
          if (!wrapper->raw->delta_cb) {
            wrapper->raw->delta_cb = (git_apply_delta_cb)delta_cb_cppCallback;
          }

          wrapper->delta_cb.SetCallback(callback, throttle, waitForResult);
        }

     }

      GitApplyOptions* GitApplyOptions::delta_cb_getInstanceFromBaton(DeltaCbBaton* baton) {
           return static_cast<GitApplyOptions*>(baton->
               payload
  );
       }

      int GitApplyOptions::delta_cb_cppCallback (
          const git_diff_delta * delta,           void * payload        ) {
        DeltaCbBaton *baton =
          new DeltaCbBaton(1);

          baton->delta = delta;
          baton->payload = payload;
 
        GitApplyOptions* instance = delta_cb_getInstanceFromBaton(baton);

           int result;

          if (instance->delta_cb.WillBeThrottled()) {
            result = baton->defaultResult;
            delete baton;
          } else if (instance->delta_cb.ShouldWaitForResult()) {
            result = baton->ExecuteAsync(delta_cb_async);
            delete baton;
          } else {
            result = baton->defaultResult;
            baton->ExecuteAsync(delta_cb_async, deleteBaton);
          }
          return result;
       }


      void GitApplyOptions::delta_cb_async(void *untypedBaton) {
        Nan::HandleScope scope;

        DeltaCbBaton* baton = static_cast<DeltaCbBaton*>(untypedBaton);
        GitApplyOptions* instance = delta_cb_getInstanceFromBaton(baton);

        if (instance->delta_cb.GetCallback()->IsEmpty()) {
            baton->result = baton->defaultResult; // no results acquired
           baton->Done();
          return;
        }

           v8::Local<Value> argv[1] = {
               GitDiffDelta::New(baton->delta, false)
            };
 
        Nan::TryCatch tryCatch;

        // TODO This should take an async_resource, but we will need to figure out how to pipe the correct context into this
        Nan::MaybeLocal<v8::Value> maybeResult = Nan::Call(*(instance->delta_cb.GetCallback()), 1, argv);
        v8::Local<v8::Value> result;
        if (!maybeResult.IsEmpty()) {
          result = maybeResult.ToLocalChecked();
        }

        if(PromiseCompletion::ForwardIfPromise(result, baton, GitApplyOptions::delta_cb_promiseCompleted)) {
          return;
        }

             if (result.IsEmpty() || result->IsNativeError()) {
              baton->result = -1;
            }
            else if (!result->IsNull() && !result->IsUndefined()) {
               if (result->IsNumber()) {
                baton->result = Nan::To<int>(result).FromJust();
              }
              else {
                baton->result = baton->defaultResult;
              }
             }
            else {
              baton->result = baton->defaultResult;
            }
           baton->Done();
       }

      void GitApplyOptions::delta_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result) {
        Nan::HandleScope scope;

        DeltaCbBaton* baton = static_cast<DeltaCbBaton*>(_baton);
           if (isFulfilled) {
              if (result.IsEmpty() || result->IsNativeError()) {
                baton->result = -1;
              }
              else if (!result->IsNull() && !result->IsUndefined()) {
                 if (result->IsNumber()) {
                  baton->result = Nan::To<int>(result).FromJust();
                }
                else{
                  baton->result = baton->defaultResult;
                }
               }
              else {
                baton->result = baton->defaultResult;
              }
           }
          else {
            // promise was rejected
               GitApplyOptions* instance = static_cast<GitApplyOptions*>(baton-> payload  );
             v8::Local<v8::Object> parent = instance->handle();
            SetPrivate(parent, Nan::New("NodeGitPromiseError").ToLocalChecked(), result);

            baton->result = -1;
          }
          baton->Done();
       }
      NAN_GETTER(GitApplyOptions::GetHunkCb) {

      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        if (wrapper->hunk_cb.HasCallback()) {
          info.GetReturnValue().Set(wrapper->hunk_cb.GetCallback()->GetFunction());
        } else {
          info.GetReturnValue().SetUndefined();
        }

     }

    NAN_SETTER(GitApplyOptions::SetHunkCb) {
      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        Nan::Callback *callback = NULL;
        int throttle = 0;
        bool waitForResult = true;

        if (value->IsFunction()) {
          callback = new Nan::Callback(value.As<Function>());
        } else if (value->IsObject()) {
          v8::Local<Object> object = value.As<Object>();
          v8::Local<String> callbackKey;
          Nan::MaybeLocal<Value> maybeObjectCallback = Nan::Get(object, Nan::New("callback").ToLocalChecked());
          if (!maybeObjectCallback.IsEmpty()) {
            v8::Local<Value> objectCallback = maybeObjectCallback.ToLocalChecked();
            if (objectCallback->IsFunction()) {
              callback = new Nan::Callback(objectCallback.As<Function>());

              Nan::MaybeLocal<Value> maybeObjectThrottle = Nan::Get(object, Nan::New("throttle").ToLocalChecked());
              if(!maybeObjectThrottle.IsEmpty()) {
                v8::Local<Value> objectThrottle = maybeObjectThrottle.ToLocalChecked();
                if (objectThrottle->IsNumber()) {
                  throttle = (int)objectThrottle.As<Number>()->Value();
                }
              }

              Nan::MaybeLocal<Value> maybeObjectWaitForResult = Nan::Get(object, Nan::New("waitForResult").ToLocalChecked());
              if(!maybeObjectWaitForResult.IsEmpty()) {
                Local<Value> objectWaitForResult = maybeObjectWaitForResult.ToLocalChecked();
                waitForResult = Nan::To<bool>(objectWaitForResult).FromJust();
              }
            }
          }
        }
        if (callback) {
          if (!wrapper->raw->hunk_cb) {
            wrapper->raw->hunk_cb = (git_apply_hunk_cb)hunk_cb_cppCallback;
          }

          wrapper->hunk_cb.SetCallback(callback, throttle, waitForResult);
        }

     }

      GitApplyOptions* GitApplyOptions::hunk_cb_getInstanceFromBaton(HunkCbBaton* baton) {
           return static_cast<GitApplyOptions*>(baton->
               payload
  );
       }

      int GitApplyOptions::hunk_cb_cppCallback (
          const git_diff_hunk * hunk,           void * payload        ) {
        HunkCbBaton *baton =
          new HunkCbBaton(1);

          baton->hunk = hunk;
          baton->payload = payload;
 
        GitApplyOptions* instance = hunk_cb_getInstanceFromBaton(baton);

           int result;

          if (instance->hunk_cb.WillBeThrottled()) {
            result = baton->defaultResult;
            delete baton;
          } else if (instance->hunk_cb.ShouldWaitForResult()) {
            result = baton->ExecuteAsync(hunk_cb_async);
            delete baton;
          } else {
            result = baton->defaultResult;
            baton->ExecuteAsync(hunk_cb_async, deleteBaton);
          }
          return result;
       }


      void GitApplyOptions::hunk_cb_async(void *untypedBaton) {
        Nan::HandleScope scope;

        HunkCbBaton* baton = static_cast<HunkCbBaton*>(untypedBaton);
        GitApplyOptions* instance = hunk_cb_getInstanceFromBaton(baton);

        if (instance->hunk_cb.GetCallback()->IsEmpty()) {
            baton->result = baton->defaultResult; // no results acquired
           baton->Done();
          return;
        }

           v8::Local<Value> argv[1] = {
               GitDiffHunk::New(baton->hunk, false)
            };
 
        Nan::TryCatch tryCatch;

        // TODO This should take an async_resource, but we will need to figure out how to pipe the correct context into this
        Nan::MaybeLocal<v8::Value> maybeResult = Nan::Call(*(instance->hunk_cb.GetCallback()), 1, argv);
        v8::Local<v8::Value> result;
        if (!maybeResult.IsEmpty()) {
          result = maybeResult.ToLocalChecked();
        }

        if(PromiseCompletion::ForwardIfPromise(result, baton, GitApplyOptions::hunk_cb_promiseCompleted)) {
          return;
        }

             if (result.IsEmpty() || result->IsNativeError()) {
              baton->result = -1;
            }
            else if (!result->IsNull() && !result->IsUndefined()) {
               if (result->IsNumber()) {
                baton->result = Nan::To<int>(result).FromJust();
              }
              else {
                baton->result = baton->defaultResult;
              }
             }
            else {
              baton->result = baton->defaultResult;
            }
           baton->Done();
       }

      void GitApplyOptions::hunk_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result) {
        Nan::HandleScope scope;

        HunkCbBaton* baton = static_cast<HunkCbBaton*>(_baton);
           if (isFulfilled) {
              if (result.IsEmpty() || result->IsNativeError()) {
                baton->result = -1;
              }
              else if (!result->IsNull() && !result->IsUndefined()) {
                 if (result->IsNumber()) {
                  baton->result = Nan::To<int>(result).FromJust();
                }
                else{
                  baton->result = baton->defaultResult;
                }
               }
              else {
                baton->result = baton->defaultResult;
              }
           }
          else {
            // promise was rejected
               GitApplyOptions* instance = static_cast<GitApplyOptions*>(baton-> payload  );
             v8::Local<v8::Object> parent = instance->handle();
            SetPrivate(parent, Nan::New("NodeGitPromiseError").ToLocalChecked(), result);

            baton->result = -1;
          }
          baton->Done();
       }
      NAN_GETTER(GitApplyOptions::GetPayload) {

      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->payload));

     }

    NAN_SETTER(GitApplyOptions::SetPayload) {
      GitApplyOptions *wrapper = Nan::ObjectWrap::Unwrap<GitApplyOptions>(info.This());

        wrapper->payload.Reset(value);

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitApplyOptionsTraits>;
