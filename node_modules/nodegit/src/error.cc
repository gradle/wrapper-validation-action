// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/error.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitError::~GitError() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
             }

  void GitError::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Error").ToLocalChecked());

           Nan::SetMethod(tpl, "clear", Clear);
            Nan::SetPrototypeMethod(tpl, "last", Last);
             Nan::SetMethod(tpl, "setOom", SetOom);
             Nan::SetMethod(tpl, "setString", SetStr);
           Nan::SetPrototypeMethod(tpl, "message", Message);
         Nan::SetPrototypeMethod(tpl, "klass", Klass);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Error").ToLocalChecked(), _constructor_template);
  }

  
/*
   */
NAN_METHOD(GitError::Clear) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
    );

    git_error_clear(
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
   * @return Error  result    */
NAN_METHOD(GitError::Last) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
    );

 const git_error * result =     git_error_last(
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (result != NULL) {
        to = GitError::New(
        result,
        false
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   */
NAN_METHOD(GitError::SetOom) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
    );

    git_error_set_oom(
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
 * @param Number error_class
   * @param String string
     */
NAN_METHOD(GitError::SetStr) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number error_class is required.");
  }

  if (info.Length() == 1 || !info[1]->IsString()) {
    return Nan::ThrowError("String string is required.");
  }

// start convert_from_v8 block
  int from_error_class;
      from_error_class = (int)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block
// start convert_from_v8 block
  const char * from_string = NULL;

  Nan::Utf8String string(Nan::To<v8::String>(info[1]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_string = (const char *) malloc(string.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_string, *string, string.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_string) + string.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              from_string
    );

    git_error_set_str(
          from_error_class
,          from_string
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
       // start field block
    NAN_METHOD(GitError::Message) {
      v8::Local<v8::Value> to;

            char *
           message =
          Nan::ObjectWrap::Unwrap<GitError>(info.This())->GetValue()->message;
 // start convert_to_v8 block
  if (message){
       to = Nan::New<v8::String>(message).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitError::Klass) {
      v8::Local<v8::Value> to;

            int
           klass =
          Nan::ObjectWrap::Unwrap<GitError>(info.This())->GetValue()->klass;
 // start convert_to_v8 block
     to = Nan::New<Number>( klass);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitErrorTraits>;
 